# Hero Vinyl Implementation Reference

> **Status:** This document records the current implementation exactly. It does not change any production code or visual asset.

## 1. Source Asset

| Item | Current value |
| --- | --- |
| Production asset constant | `HERO_IMAGE` |
| Production URL | `/manus-storage/relike-hero-vinyl-gold_a0367f0e.jpg` |
| Original local source | `/home/ubuntu/webdev-static-assets/relike-hero-vinyl-gold.jpg` |
| Image dimensions | `2560 × 1440` |
| Usage | The **same asset** is drawn first as the stationary hero background and then loaded again into the canvas as the rotating source copy. |

```tsx
const HERO_IMAGE = "/manus-storage/relike-hero-vinyl-gold_a0367f0e.jpg";
```

## 2. Layer Order in the Hero

The original background is the stationary base. The canvas is immediately above it, but only paints inside the primary vinyl-groove band. The text/UI frame appears after both layers and remains stationary.

```tsx
<section
  id="opening"
  data-chapter="opening"
  tabIndex={-1}
  className="story-chapter hero-stage"
  style={{ "--scene-image": `url(${HERO_IMAGE})` } as React.CSSProperties}
>
  <div className="hero-image" aria-hidden="true" />
  <HeroVinylRotation />
  <div className="safe-frame hero-frame">
    <div className="hero-meta reveal-up">
      <span>MARKETING · CONTENT · GROWTH</span>
      <span>CALICUT, KERALA</span>
    </div>
    <div className="hero-copy">
      <p className="micro-label reveal-up">ABHAY SREEJITH / MARKETING PORTFOLIO</p>
      <h1><span className="reveal-up">ABHAY</span><span className="reveal-up">SREEJITH</span></h1>
      {/* remaining hero content */}
    </div>
  </div>
</section>
```

## 3. Current Canvas Rotation Component

This is the complete current component. It makes an offscreen duplicate of the **same hero source image**, removes the source artwork’s separate right-side inset disc from that duplicate, masks to the main record surface, and rotates the duplicate around the mapped main-record center once every 24 seconds.

```tsx
function HeroVinylRotation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const image = new Image();
    let animationFrame = 0;
    let startTime = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const sourceWidth = 2560;
    const sourceHeight = 1440;
    const recordCenter = { x: 2180, y: 900 };
    const recordRadius = 930;
    const stationaryDisc = { x: 2550, y: 900, radius: 360 };
    let rotatingSource: HTMLCanvasElement | null = null;

    const drawHeroComposite = (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      scale: number,
      offsetX: number,
      offsetY: number,
    ) => {
      context.drawImage(rotatingSource ?? image, offsetX, offsetY, sourceWidth * scale, sourceHeight * scale);

      const horizontalShade = context.createLinearGradient(0, 0, canvasWidth, 0);
      horizontalShade.addColorStop(0, "rgba(7, 7, 7, 0.98)");
      horizontalShade.addColorStop(0.37, "rgba(7, 7, 7, 0.86)");
      horizontalShade.addColorStop(1, "rgba(7, 7, 7, 0.14)");
      context.fillStyle = horizontalShade;
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      const lowerShade = context.createLinearGradient(0, canvasHeight, 0, canvasHeight * 0.64);
      lowerShade.addColorStop(0, "rgba(7, 7, 7, 1)");
      lowerShade.addColorStop(1, "rgba(7, 7, 7, 0)");
      context.fillStyle = lowerShade;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
      context.fillStyle = "rgba(7, 7, 7, 0.08)";
      context.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const render = (time: number) => {
      if (!width || !height || document.visibilityState !== "visible") {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const scale = Math.max(width / sourceWidth, height / sourceHeight);
      const imageWidth = sourceWidth * scale;
      const imageHeight = sourceHeight * scale;
      const offsetX = (width - imageWidth) / 2;
      const offsetY = (height - imageHeight) / 2;
      const pivotX = offsetX + recordCenter.x * scale;
      const pivotY = offsetY + recordCenter.y * scale;
      const radius = recordRadius * scale;
      const angle = ((time - startTime) / 24000) * Math.PI * 2;

      context.save();
      context.beginPath();
      context.arc(pivotX, pivotY, radius, 0, Math.PI * 2);
      context.arc(
        offsetX + stationaryDisc.x * scale,
        offsetY + stationaryDisc.y * scale,
        stationaryDisc.radius * scale,
        0,
        Math.PI * 2,
        true,
      );
      context.clip("evenodd");
      context.translate(pivotX, pivotY);
      context.rotate(angle);
      context.translate(-pivotX, -pivotY);
      context.globalAlpha = 0.92;
      drawHeroComposite(context, width, height, scale, offsetX, offsetY);
      context.restore();
      animationFrame = requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    image.onload = () => {
      rotatingSource = document.createElement("canvas");
      rotatingSource.width = sourceWidth;
      rotatingSource.height = sourceHeight;
      const sourceContext = rotatingSource.getContext("2d");
      if (sourceContext) {
        sourceContext.drawImage(image, 0, 0, sourceWidth, sourceHeight);
        sourceContext.globalCompositeOperation = "destination-out";
        sourceContext.beginPath();
        sourceContext.arc(stationaryDisc.x, stationaryDisc.y, stationaryDisc.radius + 18, 0, Math.PI * 2);
        sourceContext.fill();
      }
      resize();
      startTime = performance.now();
      animationFrame = requestAnimationFrame(render);
    };

    image.src = HERO_IMAGE;

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-vinyl-rotation" aria-hidden="true" />;
}
```

## 4. Current CSS

```css
.hero-stage {
  display: grid;
  align-items: stretch;
  isolation: isolate;
}

.hero-image,
.image-wash,
.network-image {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-image {
  z-index: 0;
  background:
    linear-gradient(90deg, rgba(7, 7, 7, .98) 0%, rgba(7, 7, 7, .86) 37%, rgba(7, 7, 7, .14) 100%),
    linear-gradient(0deg, var(--ink), transparent 36%),
    var(--scene-image) center / cover;
  opacity: .92;
  transform: scale(1.052);
  transform-origin: 96% 60%;
  will-change: transform;
}

.hero-image::before,
.hero-image::after {
  display: none;
}

.hero-vinyl-rotation {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: scale(1.052);
  transform-origin: 96% 60%;
  will-change: transform;
}

.hero-frame {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 107px 0 42px;
}

@media (max-width: 560px) {
  .hero-image {
    transform-origin: 74% 46%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image {
    transform: none !important;
  }

  .hero-vinyl-rotation {
    display: none;
  }
}
```

## 5. Build Map

| Layer | Implementation | What remains still | What moves |
| --- | --- | --- | --- |
| Base hero | `.hero-image` | The original 2560×1440 artwork, black field, embedded inset disc, crop, typography, divider, nav, CTA | Nothing |
| Rotation compositor | `HeroVinylRotation` canvas | The canvas boundary and CSS registration | The same source image, but only where the primary record band is exposed by the mask |
| Primary record mask | `recordCenter: (2180, 900)`, `recordRadius: 930` | Outside-mask source image | Main large record surface |
| Inset-disc cutout | `stationaryDisc: (2550, 900)`, `radius: 360` | The original right-side inset disc | Nothing |
| Timing | `angle = ((time - startTime) / 24000) * 2π` | All non-vinyl hero content | One linear 360° turn every 24 seconds |
| Accessibility | `prefers-reduced-motion` | Entire hero remains static | Canvas does not run and is not shown |

## 6. Files That Currently Control This Behavior

| File | Exact responsibility |
| --- | --- |
| `client/src/pages/Home.tsx` | Asset reference, `HeroVinylRotation`, canvas geometry/timing, and hero markup order. |
| `client/src/index.css` | Stationary image composition, matching canvas placement, mobile transform-origin, and reduced-motion visibility. |
| `/home/ubuntu/webdev-static-assets/relike-hero-vinyl-gold.jpg` | Original local source asset. |

No other current component, generated image, canvas particle field, CSS pseudo-element, or animation asset controls the hero vinyl rotation.
