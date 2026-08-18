/* Abhay Sreejith marketing portfolio: a personal editorial case-study site where Re:Like Vibes is visual proof of strategy, content, growth, and operations work. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronRight, Crosshair, Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/components/MagneticLink";
import SignalCanvas, { type SignalStage } from "@/components/SignalCanvas";

const HERO_IMAGE = "/manus-storage/relike-hero-vinyl-gold_a0367f0e.jpg";
const COMPLETE_VINYL = "/manus-storage/abhay-complete-vinyl_03e8d72a.png";
const SILVER_MILESTONE = "/manus-storage/relike-silver-milestone_d8520019.jpg";
const GOLD_MILESTONE = "/manus-storage/relike-gold-milestone_8177e89a.jpg";
const RECORD_MARK = "/manus-storage/relike-record-mark_0daa93e8.png";

const navigation = [
  { id: "opening", label: "Abhay", stage: "signal" as SignalStage },
  { id: "audience", label: "Impact", stage: "audience" as SignalStage },
  { id: "operation", label: "Approach", stage: "flow" as SignalStage },
  { id: "analytics", label: "Strategy", stage: "grid" as SignalStage },
  { id: "experiments", label: "Experience", stage: "clusters" as SignalStage },
  { id: "growth", label: "Results", stage: "network" as SignalStage },
  { id: "systems", label: "Method", stage: "loop" as SignalStage },
  { id: "toolkit", label: "Capabilities", stage: "network" as SignalStage },
  { id: "education", label: "Profile", stage: "quiet" as SignalStage },
  { id: "contact", label: "Connect", stage: "quiet" as SignalStage },
];

const chapterCount = (id: string, context: string) => {
  const number = Math.max(0, navigation.findIndex((item) => item.id === id) + 1);
  return `${String(number).padStart(2, "0")} / ${context}`;
};

const pipeline = [
  { title: "Research / frame", detail: "Start with a listener need, a cultural cue, and a reason for the release to exist.", outcome: "OUTCOME / A sharper listening problem to solve." },
  { title: "Position / plan", detail: "Turn that cue into a distinct promise, a release plan, and a distribution rhythm people can recognise.", outcome: "OUTCOME / A promise with a place in the catalog." },
  { title: "Create / publish", detail: "Build titles, formats, packaging, and channel moments designed to be found, played, and remembered.", outcome: "OUTCOME / A tangible audience entry point." },
  { title: "Distribute / grow", detail: "Pair long-form discovery with short-form momentum to take a focused release to the right listeners.", outcome: "OUTCOME / More relevant paths into the work." },
  { title: "Measure / learn", detail: "Read watch time, retention, replay behavior, and audience response to understand how the release travelled.", outcome: "OUTCOME / Evidence for the next release decision." },
  { title: "Improve / scale", detail: "Carry the learning into the next cut, campaign, and catalog decision so the audience has a reason to return.", outcome: "OUTCOME / A stronger return path for the next cycle." },
];

const studioLanes = [
  { title: "STRATEGY", note: "Give the work a reason to win", tools: ["Audience research", "Positioning", "Campaign planning"] },
  { title: "CONTENT", note: "Make the idea tangible", tools: ["Editorial direction", "YouTube & social", "Content operations"] },
  { title: "GROWTH", note: "Turn response into momentum", tools: ["YouTube Analytics", "Retention signals", "Performance learning"] },
];

const analyticsMetrics = [
  { id: "ctr", label: "CTR", question: "Does the first promise earn attention?", insight: "The first catalog signal tests whether positioning, packaging, and the content promise are clear enough to invite a play.", path: "M0 222C45 209 48 193 90 198C139 202 141 146 188 153C238 160 259 105 311 122C357 138 373 69 413 86C452 103 479 90 510 60C542 28 573 51 640 14", points: [[311, 122], [510, 60], [640, 14]], sequence: [["FIRST / PROMISE", "Does the first promise earn attention?"], ["THEN / DEPTH", "Does the play lead to deeper listening?"], ["THEN / RETURN", "Does the promise give people a reason to return?"], ["FINALLY / NEXT TEST", "Which promise should the next release improve?"]] },
  { id: "watch-time", label: "WATCH TIME", question: "Does the idea earn more of the audience’s time?", insight: "Watch time shows whether a release holds attention long enough to become part of a deeper viewing session.", path: "M0 188C38 174 72 180 108 162C147 143 169 148 211 155C254 162 278 117 322 126C366 135 401 91 442 103C485 116 532 60 571 70C607 80 625 48 640 44", points: [[211, 155], [442, 103], [640, 44]], sequence: [["FIRST / DEPTH", "Does the release earn more of the audience’s time?"], ["THEN / HOLD", "Which section sustains the session?"], ["THEN / RETURN", "What depth of value earns another visit?"], ["FINALLY / NEXT TEST", "Which moment should the next cut strengthen?"]] },
  { id: "retention", label: "RETENTION", question: "Where does attention hold—and where does it leave?", insight: "Retention turns a listening curve into an editorial diagnosis: pacing, payoff, and clarity can be improved moment by moment.", path: "M0 92C38 97 65 109 101 118C138 127 163 104 201 119C242 136 275 145 316 151C359 158 380 127 420 139C465 152 498 173 536 163C575 153 598 177 640 187", points: [[101, 118], [420, 139], [640, 187]], sequence: [["FIRST / HOLD", "Where does attention hold?"], ["THEN / LEAVE", "Where does the audience begin to leave?"], ["THEN / RETURN", "Which moment is worth replaying?"], ["FINALLY / NEXT TEST", "What should the edit improve first?"]] },
  { id: "replays", label: "REPLAYS", question: "Which moments make people come back?", insight: "Replay behavior identifies pieces of a release worth revisiting—resonance, usefulness, surprise, or a moment people want to keep.", path: "M0 212C42 207 65 185 104 192C144 201 167 167 210 173C252 180 274 125 318 136C361 147 385 111 426 121C467 131 503 79 543 91C581 102 612 47 640 52", points: [[210, 173], [426, 121], [640, 52]], sequence: [["FIRST / RETURN", "Which moment makes people come back?"], ["THEN / VALUE", "What makes that moment worth another look?"], ["THEN / SHARE", "What could make it useful beyond one play?"], ["FINALLY / NEXT TEST", "Where should the next format create a payoff?"]] },
  { id: "engagement", label: "ENGAGEMENT", question: "What makes the audience respond?", insight: "Comments, shares, and other responses show where a release becomes a conversation rather than a passive play.", path: "M0 201C39 179 76 205 113 185C151 164 184 180 221 146C260 112 302 137 340 120C382 102 408 130 449 92C488 57 533 85 570 49C604 18 622 27 640 16", points: [[221, 146], [449, 92], [640, 16]], sequence: [["FIRST / RESPONSE", "What makes the audience respond?"], ["THEN / CONVERSATION", "Which response becomes a conversation?"], ["THEN / SHARE", "What is useful enough to pass along?"], ["FINALLY / NEXT TEST", "How should the next release invite a reply?"]] },
  { id: "discovery", label: "DISCOVERY", question: "How does the right audience find the work?", insight: "Discovery reads the routes into a release—search, recommendation, shares, and channel surfaces—to refine distribution choices.", path: "M0 224C45 214 75 211 112 195C150 178 181 162 217 150C254 138 286 127 322 111C358 95 387 103 423 86C461 69 503 57 539 49C579 41 610 24 640 12", points: [[217, 150], [423, 86], [640, 12]], sequence: [["FIRST / PATH", "How does the right audience find the release?"], ["THEN / MATCH", "Which surface best matches their intent?"], ["THEN / RETURN", "What route creates a repeat visit?"], ["FINALLY / NEXT TEST", "Which distribution path should improve next?"]] },
] as const;

type AnalyticsMetric = (typeof analyticsMetrics)[number];

function Eyebrow({ children, count }: { children: string; count?: string }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-rule" />
      <span>{children}</span>
      {count && <span className="eyebrow-count">{count}</span>}
    </div>
  );
}

function Metric({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="metric-block">
      <span className="metric-value">{value}</span>
      <span className="metric-label">{label}</span>
      {note && <span className="metric-note">{note}</span>}
    </div>
  );
}

function DataSparkline({ metric, drawProgress }: { metric: AnalyticsMetric; drawProgress: number }) {
  const pointThresholds = [0.44, 0.68, 0.92];
  return (
    <svg className="sparkline" style={{ "--chart-draw": drawProgress } as React.CSSProperties} viewBox="0 0 640 260" fill="none" role="img" aria-label={`Illustrative ${metric.label} audience signal ledger`}>
      <path d="M0 220H640M0 160H640M0 100H640M0 40H640" className="chart-grid" />
      <g key={metric.id} className="chart-curve">
        <path d={metric.path} className="chart-line" pathLength="1" />
        {metric.points.map(([cx, cy], index) => <circle key={`${metric.id}-${index}`} cx={cx} cy={cy} r="5" className={`chart-point ${drawProgress >= pointThresholds[index] ? "is-visible" : ""}`} />)}
      </g>
    </svg>
  );
}

function HeroVinylRotation() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const vinylCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const vinylCanvas = vinylCanvasRef.current;
    if (!backgroundCanvas || !vinylCanvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const image = new Image();
    let animationFrame = 0;
    let startTime = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    const sourceWidth = 2560;
    const sourceHeight = 1440;
    const recordCenter = { x: 2256.33, y: 943.75 };
    const recordRadius = 976.05;
    const stationaryDisc = { x: 2550, y: 900, radius: 360 };
    let rotatingSource: HTMLCanvasElement | null = null;

    const drawHeroShading = (context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
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

    const primaryMask = (context: CanvasRenderingContext2D, pivotX: number, pivotY: number, radius: number, offsetX: number, offsetY: number, scale: number) => {
      context.beginPath();
      context.arc(pivotX, pivotY, radius, 0, Math.PI * 2);
      context.arc(offsetX + stationaryDisc.x * scale, offsetY + stationaryDisc.y * scale, stationaryDisc.radius * scale, 0, Math.PI * 2, true);
    };

    const render = (time: number) => {
      if (!width || !height || document.visibilityState !== "visible") {
        if (!reducedMotion) animationFrame = requestAnimationFrame(render);
        return;
      }

      const backgroundContext = backgroundCanvas.getContext("2d");
      const vinylContext = vinylCanvas.getContext("2d");
      if (!backgroundContext || !vinylContext) return;
      backgroundContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      vinylContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      backgroundContext.clearRect(0, 0, width, height);
      vinylContext.clearRect(0, 0, width, height);

      const scale = Math.max(width / sourceWidth, height / sourceHeight);
      const imageWidth = sourceWidth * scale;
      const imageHeight = sourceHeight * scale;
      const offsetX = (width - imageWidth) / 2;
      const offsetY = (height - imageHeight) / 2;
      const pivotX = offsetX + recordCenter.x * scale;
      const pivotY = offsetY + recordCenter.y * scale;
      const radius = recordRadius * scale;
      const angle = reducedMotion ? 0 : ((time - startTime) / 24000) * Math.PI * 2;

      // Stationary layer: original source pixels plus original colour treatment,
      // then remove only the primary vinyl. The inset disc remains here.
      backgroundContext.drawImage(image, offsetX, offsetY, sourceWidth * scale, sourceHeight * scale);
      drawHeroShading(backgroundContext, width, height);
      backgroundContext.save();
      backgroundContext.globalCompositeOperation = "destination-out";
      primaryMask(backgroundContext, pivotX, pivotY, radius, offsetX, offsetY, scale);
      backgroundContext.fill("evenodd");
      backgroundContext.restore();

      // Rotating layer: the same source pixels, with the embedded inset disc
      // removed before drawing, fill exactly the primary-vinyl vacancy above.
      vinylContext.save();
      primaryMask(vinylContext, pivotX, pivotY, radius, offsetX, offsetY, scale);
      vinylContext.clip("evenodd");
      vinylContext.translate(pivotX, pivotY);
      vinylContext.rotate(angle);
      vinylContext.translate(-pivotX, -pivotY);
      vinylContext.drawImage(rotatingSource ?? image, offsetX, offsetY, sourceWidth * scale, sourceHeight * scale);
      vinylContext.restore();
      vinylContext.save();
      primaryMask(vinylContext, pivotX, pivotY, radius, offsetX, offsetY, scale);
      vinylContext.clip("evenodd");
      drawHeroShading(vinylContext, width, height);
      vinylContext.restore();
      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = vinylCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      [backgroundCanvas, vinylCanvas].forEach((canvas) => {
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
      });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(vinylCanvas);
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

  return <div className="hero-vinyl-stage" aria-hidden="true"><div className="hero-vinyl-orbit"><img src={COMPLETE_VINYL} alt="" /></div></div>;
}

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  const [selectedMetricId, setSelectedMetricId] = useState<AnalyticsMetric["id"]>("ctr");
  const [analyticsStep, setAnalyticsStep] = useState(0);
  const [chartDraw, setChartDraw] = useState(0.04);
  const [metricReplayNonce, setMetricReplayNonce] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const indexTriggerRef = useRef<HTMLButtonElement>(null);
  const metricControlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pipelineControlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pipelineScrollIndexRef = useRef(0);
  const analyticsInitialHoldRef = useRef(false);
  const analyticsInitialPlayedRef = useRef(false);

  const stage = navigation[activeChapter]?.stage ?? "signal";
  const progress = ((activeChapter + 1) / navigation.length) * 100;
  const activePipeline = pipeline[pipelineIndex];
  const selectedMetric = analyticsMetrics.find((metric) => metric.id === selectedMetricId) ?? analyticsMetrics[0];
  const stageIsQuiet = stage === "quiet";

  const navLinks = useMemo(() => navigation.slice(0, 5), []);

  const selectMetric = (index: number) => {
    const nextMetricId = analyticsMetrics[index].id;
    if (nextMetricId === selectedMetricId) return;
    setSelectedMetricId(nextMetricId);
    setMetricReplayNonce((current) => current + 1);
  };

  const handleMetricKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const key = event.key;
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const next = key === "Home" ? 0 : key === "End" ? analyticsMetrics.length - 1 : (index + (key === "ArrowRight" || key === "ArrowDown" ? 1 : -1) + analyticsMetrics.length) % analyticsMetrics.length;
    selectMetric(next);
    metricControlRefs.current[next]?.focus();
  };

  const handlePipelineKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const key = event.key;
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const next = key === "Home" ? 0 : key === "End" ? pipeline.length - 1 : (index + (key === "ArrowRight" || key === "ArrowDown" ? 1 : -1) + pipeline.length) % pipeline.length;
    setPipelineIndex(next);
    pipelineControlRefs.current[next]?.focus();
  };

  useEffect(() => {
    if (metricReplayNonce === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChartDraw(1);
      setAnalyticsStep(3);
      return;
    }
    const trace = { value: 0 };
    setChartDraw(0);
    setAnalyticsStep(0);
    const replay = gsap.timeline();
    replay.to(trace, { value: 1, duration: 0.92, ease: "power2.out", onUpdate: () => setChartDraw(trace.value) }, 0);
    replay.call(() => setAnalyticsStep(1), [], 0.32);
    replay.call(() => setAnalyticsStep(2), [], 0.61);
    replay.call(() => setAnalyticsStep(3), [], 0.84);
    return () => {
      replay.kill();
    };
  }, [metricReplayNonce]);

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    gsap.registerPlugin(ScrollTrigger);
    let restoreAnalyticsScroll = () => {};
    let initialAnalyticsTrace: gsap.core.Timeline | null = null;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power4.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".chapter-title").forEach((element) => {
        if (element.closest(".experiments-intro")) {
          gsap.fromTo(
            element,
            { y: 18, letterSpacing: "0.01em", opacity: 0.72 },
            {
              y: 0,
              letterSpacing: "-0.06em",
              opacity: 1,
              duration: 0.58,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 82%", once: true },
            },
          );
          return;
        }
        gsap.fromTo(
          element,
          { letterSpacing: "0.08em", opacity: 0.25 },
          {
            letterSpacing: "-0.06em",
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 78%", end: "top 34%", scrub: 0.9 },
          },
        );
      });
      const progressChapters = [
        ".audience-stage",
        ".operation-stage",
        ".analytics-stage",
        ".experiments-stage",
        ".growth-stage",
        ".system-stage",
        ".toolkit-stage",
      ];
      progressChapters.forEach((selector) => {
        const chapter = rootRef.current?.querySelector<HTMLElement>(selector);
        if (!chapter) return;
        chapter.style.setProperty("--chapter-progress", "0");
        ScrollTrigger.create({
          trigger: chapter,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => chapter.style.setProperty("--chapter-progress", self.progress.toFixed(3)),
        });
      });

      const operation = rootRef.current?.querySelector<HTMLElement>(".operation-stage");
      if (operation) {
        ScrollTrigger.create({
          trigger: operation,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const next = Math.min(pipeline.length - 1, Math.floor(self.progress * pipeline.length));
            if (next !== pipelineScrollIndexRef.current) {
              pipelineScrollIndexRef.current = next;
              setPipelineIndex(next);
            }
          },
        });
      }

      const analytics = rootRef.current?.querySelector<HTMLElement>(".analytics-stage");
      if (analytics) {
        analytics.dataset.question = "1";
        const playInitialAnalyticsTrace = () => {
          if (analyticsInitialHoldRef.current || analyticsInitialPlayedRef.current) return;
          analyticsInitialHoldRef.current = true;

          const documentElement = document.documentElement;
          const body = document.body;
          const previousDocumentOverflow = documentElement.style.overflow;
          const previousBodyOverflow = body.style.overflow;
          const stopScrollInput = (event: Event) => event.preventDefault();
          const stopScrollKey = (event: KeyboardEvent) => {
            if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) event.preventDefault();
          };
          documentElement.style.overflow = "hidden";
          body.style.overflow = "hidden";
          window.addEventListener("wheel", stopScrollInput, { passive: false });
          window.addEventListener("touchmove", stopScrollInput, { passive: false });
          window.addEventListener("keydown", stopScrollKey, { passive: false });
          restoreAnalyticsScroll = () => {
            documentElement.style.overflow = previousDocumentOverflow;
            body.style.overflow = previousBodyOverflow;
            window.removeEventListener("wheel", stopScrollInput);
            window.removeEventListener("touchmove", stopScrollInput);
            window.removeEventListener("keydown", stopScrollKey);
          };

          const trace = { value: 0 };
          setChartDraw(0);
          setAnalyticsStep(0);
          const traceTimeline = gsap.timeline({
            onComplete: () => {
              analyticsInitialHoldRef.current = false;
              analyticsInitialPlayedRef.current = true;
              restoreAnalyticsScroll();
            },
          });
          traceTimeline.to(trace, { value: 1, duration: 1.18, ease: "power2.out", onUpdate: () => setChartDraw(trace.value) }, 0);
          traceTimeline.call(() => setAnalyticsStep(1), [], 0.42);
          traceTimeline.call(() => setAnalyticsStep(2), [], 0.79);
          traceTimeline.call(() => setAnalyticsStep(3), [], 1.08);
          initialAnalyticsTrace = traceTimeline;
        };
        ScrollTrigger.create({
          trigger: analytics,
          start: "top top",
          end: "bottom bottom",
          onEnter: playInitialAnalyticsTrace,
          onLeaveBack: () => {
            analyticsInitialPlayedRef.current = false;
            setChartDraw(0.04);
            setAnalyticsStep(0);
          },
          onUpdate: (self) => {
            if (self.isActive && !analyticsInitialHoldRef.current && !analyticsInitialPlayedRef.current) {
              playInitialAnalyticsTrace();
            }
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".experiment").forEach((experiment) => {
        gsap.fromTo(
          experiment,
          { y: 26, opacity: 0.78, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.48,
            ease: "power3.out",
            scrollTrigger: { trigger: experiment, start: "top 82%", once: true },
          },
        );
      });

      const lateChapterReveals = [
        { selector: ".growth-stage .breakthrough-number", from: { xPercent: -10, y: 36, opacity: 0.18, scale: 0.9 }, start: "top 84%", end: "top 38%" },
        { selector: ".growth-stage .breakthrough-copy", from: { xPercent: 7, y: 28, opacity: 0.16 }, start: "top 80%", end: "top 34%" },
        { selector: ".growth-stage .breakthrough-footer", from: { y: 20, opacity: 0.14 }, start: "top 58%", end: "top 25%" },
        { selector: ".system-stage .rhythm-statement", from: { xPercent: 9, y: 32, opacity: 0.18 }, start: "top 82%", end: "top 35%" },
        { selector: ".toolkit-stage .studio-heading", from: { y: 28, opacity: 0.2 }, start: "top 84%", end: "top 46%" },
        { selector: ".education-stage .origin-intro", from: { xPercent: -7, y: 28, opacity: 0.16 }, start: "top 82%", end: "top 34%" },
        { selector: ".education-stage .origin-record", from: { xPercent: 8, y: 28, opacity: 0.16 }, start: "top 78%", end: "top 32%" },
        { selector: ".education-stage .origin-footer", from: { y: 22, opacity: 0.14 }, start: "top 56%", end: "top 24%" },
        { selector: ".contact-stage .final-kicker", from: { y: 22, opacity: 0.18 }, start: "top 84%", end: "top 60%" },
        { selector: ".contact-stage .final-main h2", from: { y: 48, opacity: 0.12, scale: 0.94 }, start: "top 80%", end: "top 32%" },
        { selector: ".contact-stage .final-support", from: { y: 24, opacity: 0.18 }, start: "top 62%", end: "top 34%" },
        { selector: ".contact-stage .final-proof, .contact-stage .contact-action", from: { y: 26, opacity: 0.14 }, start: "top 55%", end: "top 23%" },
      ];

      lateChapterReveals.forEach(({ selector, from, start, end }) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(element, from, {
            xPercent: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: element, start, end, scrub: 0.72 },
          });
        });
      });

      gsap.utils.toArray<HTMLElement>(".system-stage .rhythm-steps li, .toolkit-stage .studio-lane").forEach((element, index) => {
        gsap.fromTo(element, { y: 28, opacity: 0.18 }, {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            end: "top 45%",
            scrub: 0.6 + (index % 3) * 0.06,
          },
        });
      });
      ScrollTrigger.refresh();
    }, rootRef);

    return () => {
      context.revert();
      initialAnalyticsTrace?.kill();
      restoreAnalyticsScroll();
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateChapter = () => {
      const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const anchor = window.innerHeight * 0.52;
      let next = 0;
      chapters.forEach((chapter) => {
        if (chapter.getBoundingClientRect().top <= anchor) {
          const index = navigation.findIndex((item) => item.id === chapter.dataset.chapter);
          if (index >= 0) next = index;
        }
      });
      setActiveChapter((current) => current === next ? current : next);
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateChapter();
      });
    };
    updateChapter();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const updateHashChapter = () => {
      const id = window.location.hash.replace("#", "");
      const index = navigation.findIndex((item) => item.id === id);
      if (index >= 0) setActiveChapter(index);
    };
    updateHashChapter();
    window.addEventListener("hashchange", updateHashChapter);
    return () => window.removeEventListener("hashchange", updateHashChapter);
  }, []);

  useEffect(() => {
    if (!isIndexOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsIndexOpen(false);
      window.requestAnimationFrame(() => indexTriggerRef.current?.focus());
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isIndexOpen]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = document.querySelector<HTMLElement>(".cursor-tool");
    if (!cursor) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = 0;
      });
    };
    const enter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      cursor.dataset.label = target.dataset.cursor || "EXPLORE";
      cursor.classList.add("is-active");
    };
    const leave = () => cursor.classList.remove("is-active");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));
    window.addEventListener("pointermove", move);
    targets.forEach((target) => {
      target.addEventListener("pointerenter", enter);
      target.addEventListener("pointerleave", leave);
    });
    return () => {
      window.removeEventListener("pointermove", move);
      window.cancelAnimationFrame(frame);
      targets.forEach((target) => {
        target.removeEventListener("pointerenter", enter);
        target.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return (
    <div ref={rootRef} className={`portfolio-root ${stageIsQuiet ? "quiet-mode" : ""}`}>
      <SignalCanvas stage={stage} />
      <aside className="field-evidence" aria-hidden="true">
        <div className="field-evidence-brand"><span className="founder-mark">AS</span><span>ABHAY / SREEJITH</span></div>
        <i />
        <span>MARKETING<br />PORTFOLIO</span>
        <i />
        <span>FLAGSHIP CASE /<br />RE:LIKE VIBES</span>
      </aside>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-tool" aria-hidden="true" />

      <header className="story-nav">
        <a className="nav-logo" href="#opening" aria-label="Return to start" data-cursor="TOP">
          <span className="founder-mark">AS</span>
          <span>ABHAY SREEJITH</span>
        </a>
        <nav className="nav-chapters" aria-label="Story chapters">
          {navLinks.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={navigation[activeChapter]?.id === item.id ? "is-current" : ""} data-cursor="JUMP">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="story-meter" aria-label={`Chapter ${activeChapter + 1} of ${navigation.length}`}>
          <span>{String(activeChapter + 1).padStart(2, "0")} / {String(navigation.length).padStart(2, "0")}</span>
          <i><b style={{ transform: `scaleX(${progress / 100})` }} /></i>
        </div>
        <button ref={indexTriggerRef} className="nav-index" type="button" onClick={() => setIsIndexOpen((open) => !open)} aria-expanded={isIndexOpen} aria-controls="story-index" data-cursor="INDEX">
          <span>{isIndexOpen ? "CLOSE" : "INDEX"}</span><Plus size={13} />
        </button>
      </header>
      <aside id="story-index" className={`story-index ${isIndexOpen ? "is-open" : ""}`} aria-label="Full story index" aria-hidden={!isIndexOpen} inert={!isIndexOpen}>
        <div className="index-heading"><span>CHAPTER INDEX</span><span>{String(activeChapter + 1).padStart(2, "0")} / {String(navigation.length).padStart(2, "0")}</span></div>
        <div className="index-links">{navigation.map((item, index) => <a key={item.id} href={`#${item.id}`} className={activeChapter === index ? "is-current" : ""} onClick={() => setIsIndexOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ChevronRight size={15} /></a>)}</div>
      </aside>

      <main>
        <section id="opening" data-chapter="opening" tabIndex={-1} className="story-chapter hero-stage" style={{ "--scene-image": `url(${HERO_IMAGE})` } as React.CSSProperties}>
          <HeroVinylRotation />
          <div className="safe-frame hero-frame">
            <div className="hero-meta reveal-up"><span>MARKETING · CONTENT · GROWTH</span><span>CALICUT, KERALA</span></div>
            <div className="hero-copy">
              <p className="micro-label reveal-up">ABHAY SREEJITH / MARKETING PORTFOLIO</p>
              <h1><span className="reveal-up">ABHAY</span><span className="reveal-up">SREEJITH</span></h1>
              <div className="hero-bottom reveal-up">
                <p>I build content, campaigns, and distribution systems people choose to return to.</p>
                <a href="#audience" className="scroll-prompt" data-cursor="SCROLL">
                  <ArrowDown size={15} /> <span>VIEW THE WORK</span>
                </a>
              </div>
            </div>
            <div className="hero-evidence reveal-up"><span>FLAGSHIP CASE STUDY / RE:LIKE VIBES</span><span>CONTENT · GROWTH · OPERATIONS</span></div>
          </div>
        </section>

        <section id="audience" data-chapter="audience" tabIndex={-1} className="story-chapter audience-stage">
          <div className="scene-sticky">
            <div className="image-wash" aria-hidden="true" />
            <div className="safe-frame audience-layout">
              <div className="topline"><Eyebrow count={chapterCount("audience", "FLAGSHIP IMPACT")}>Re:Like Vibes as proof</Eyebrow><span className="technical-note">CONTENT-LED GROWTH</span></div>
              <div className="evidence-rail audience-evidence"><span>ROLE / CONTENT + GROWTH</span><span>FORMAT / YOUTUBE + SHORTS</span><span>OUTCOME / COMMUNITY</span></div>
              <div className="audience-narrative">
                <p className="line-sequence reveal-up">A focused idea lands.</p>
                <p className="line-sequence reveal-up">A useful experience earns attention.</p>
                <p className="line-sequence signal-line reveal-up">Then a community gives the work momentum.</p>
              </div>
              <div className="metric-pair">
                <Metric value="1.6M+" label="Subscribers" />
                <Metric value="5B+" label="Lifetime views" note="Flagship case-study outcome" />
              </div>
              <div className="award-gallery" aria-label="Silver, Gold, and Diamond recognition milestones"><figure className="award-card award-silver" style={{ "--award-image": `url(${SILVER_MILESTONE})` } as React.CSSProperties}><figcaption><span>100K</span><small>SILVER CREATOR MILESTONE</small></figcaption></figure><figure className="award-card award-gold" style={{ "--award-image": `url(${GOLD_MILESTONE})` } as React.CSSProperties}><figcaption><span>1M</span><small>GOLD CREATOR MILESTONE</small></figcaption></figure><figure className="award-card award-diamond"><div className="diamond-facet" aria-hidden="true" /><figcaption><span>5B+</span><small>DIAMOND VIEWS MILESTONE</small></figcaption></figure></div>
            </div>
          </div>
        </section>

        <section id="operation" data-chapter="operation" tabIndex={-1} className="story-chapter operation-stage">
          <div className="scene-sticky">
            <div className="safe-frame operation-layout">
              <div className="operation-heading">
                <Eyebrow count={chapterCount("operation", "THE APPROACH")}>2022 — Present</Eyebrow>
                <div className="evidence-rail"><span>CASE STUDY / RE:LIKE VIBES</span><span>CATALOG STRATEGY + RELEASE OPERATIONS</span></div>
                <h2 className="chapter-title">AN IDEA<br />BECOMES A<br /><em>SYSTEM.</em></h2>
                <p className="support-copy">At Re:Like Vibes, I turned listener cues, packaging, catalog cadence, distribution, and audience response into a marketing practice built for the return.</p>
              </div>
              <div className="pipeline-area">
                <div className="pipeline-track" style={{ "--pipeline-progress": `${((pipelineIndex + 1) / pipeline.length) * 100}%` } as React.CSSProperties} role="tablist" aria-label="Re:Like Vibes content operation">
                  {pipeline.map((item, index) => (
                    <button
                      ref={(element) => { pipelineControlRefs.current[index] = element; }}
                      key={item.title}
                      type="button"
                      role="tab"
                      aria-selected={pipelineIndex === index}
                      aria-controls="pipeline-detail"
                      id={`pipeline-stage-${index}`}
                      onFocus={() => setPipelineIndex(index)}
                      onMouseEnter={() => setPipelineIndex(index)}
                      onClick={() => setPipelineIndex(index)}
                      onKeyDown={(event) => handlePipelineKeyDown(event, index)}
                      className={pipelineIndex === index ? "is-selected" : ""}
                      data-cursor="DATA"
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>{item.title}
                    </button>
                  ))}
                </div>
                <div id="pipeline-detail" className="pipeline-detail" role="tabpanel" aria-labelledby={`pipeline-stage-${pipelineIndex}`} aria-live="polite"><span>ACTIVE STAGE / {String(pipelineIndex + 1).padStart(2, "0")}</span><p>{activePipeline.detail}</p><b>{activePipeline.outcome}</b></div>
              </div>
              <div className="scale-turn"><span>LISTEN. / PACKAGE. / RELEASE. / LEARN.</span><h3>Every response<br />informs the next release.</h3></div>
            </div>
          </div>
        </section>

        <section id="analytics" data-chapter="analytics" data-question="1" tabIndex={-1} className="story-chapter analytics-stage">
          <div className="scene-sticky">
            <div className="safe-frame analytics-layout">
              <div className="analytics-top">
                <Eyebrow count={chapterCount("analytics", "THE STRATEGY")}>From content to insight</Eyebrow>
                <div className="evidence-rail"><span>LISTENING SIGNALS</span><span>QUESTION-LED OPTIMIZATION</span></div>
                <div className="question-lockup">
                  <span>The listener is</span>
                  <strong>the brief.</strong>
                </div>
              </div>
              <div className="analytics-visual reveal-up">
                <div className="analytic-tags" role="tablist" aria-label="Illustrative audience listening signals">
                  {analyticsMetrics.map((metric, index) => <button ref={(element) => { metricControlRefs.current[index] = element; }} key={metric.id} type="button" role="tab" aria-selected={selectedMetric.id === metric.id} aria-controls="analytics-metric-panel" id={`metric-${metric.id}`} className={selectedMetric.id === metric.id ? "is-active" : ""} onClick={() => selectMetric(index)} onFocus={() => selectMetric(index)} onKeyDown={(event) => handleMetricKeyDown(event, index)} data-cursor="DATA"><span>{metric.label}</span></button>)}
                </div>
                <DataSparkline metric={selectedMetric} drawProgress={chartDraw} />
                <div id="analytics-metric-panel" className="metric-insight" role="tabpanel" aria-labelledby={`metric-${selectedMetric.id}`} aria-live="polite"><span>LISTENING SIGNAL / {selectedMetric.label}</span><p>{selectedMetric.insight}</p><b>{selectedMetric.question}</b></div>
                <div className="visualization-label"><Crosshair size={13} /> ILLUSTRATIVE SIGNAL LEDGER / NO HISTORICAL PERFORMANCE DATA SHOWN</div>
              </div>
              <div className="question-sequence" aria-live="polite" aria-label={`${selectedMetric.label} decision sequence`}>
                {selectedMetric.sequence.map(([label, question], index) => <p key={`${selectedMetric.id}-${index}`} className={`${index < analyticsStep ? "is-complete" : ""} ${index === analyticsStep ? "is-current" : ""} ${index === selectedMetric.sequence.length - 1 ? "final-question" : ""}`}><span>{label}</span>{question}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section id="experiments" data-chapter="experiments" tabIndex={-1} className="story-chapter experiments-stage">
          <div className="safe-frame experiments-layout">
            <div className="experiments-intro"><Eyebrow count={chapterCount("experiments", "SELECTED EXPERIENCE")}>Flagship case-study proof</Eyebrow><h2 className="chapter-title">CONTENT<br />THAT BUILDS<br /><em>MOMENTUM.</em></h2></div>
            <article className="experiment experiment-one" data-cursor="EXPLORE">
              <div className="experiment-index">CONTENT ENGINE / 01</div>
              <div className="experiment-data"><span>982 RELEASES</span><span>CONTENT + DISCOVERY</span></div>
              <h3>More than a<br />single post.</h3>
              <p>A disciplined release ledger gave listeners more ways to find, remember, replay, and return to the work.</p>
              <div className="mini-dashboard" aria-label="Illustrative catalog visualization"><i /><i /><i /><b>CATALOG RHYTHM</b></div>
            </article>
            <article className="experiment experiment-two" data-cursor="DATA">
              <div className="experiment-index">BREAKOUT DISTRIBUTION / 02</div>
              <div className="experiment-data"><span>193M+ VIEWS</span><span>BELLA CIAO / LYRICS</span></div>
              <h3>One idea can<br />travel farther.</h3>
              <p>A featured Re:Like Vibes release connected culture, discoverability, and timing to become a global listening moment.</p>
              <ul><li>Audience discovery</li><li>Cultural relevance</li><li>Searchable packaging</li><li>Retention momentum</li></ul>
            </article>
            <article className="experiment experiment-three" data-cursor="DATA">
              <div className="experiment-index">AUDIENCE TRUST / 03</div>
              <div className="experiment-data"><span>100K → 1M → 5B+ VIEWS</span><span>SILVER → GOLD → DIAMOND</span></div>
              <h3>Trust that<br />compounds.</h3>
              <p>From an independent channel to Silver, Gold, and Diamond recognition—public markers of sustained audience scale and reach.</p>
              <div className="projected-note">PUBLIC CASE-STUDY RESULT / 5B+ LIFETIME VIEWS</div>
            </article>
          </div>
        </section>

        <section id="growth" data-chapter="growth" tabIndex={-1} className="story-chapter growth-stage">
          <div className="scene-sticky">
            <div className="safe-frame breakthrough-layout">
              <div className="second-act-topline"><div className="section-brand"><span className="founder-mark">AS</span><Eyebrow count={chapterCount("growth", "FLAGSHIP RESULT")}>When strategy travels</Eyebrow></div><span>CASE STUDY / RESULT 06</span></div>
              <div className="breakthrough-center">
                <div className="breakthrough-number">193<span>M+</span></div>
                <div className="breakthrough-copy"><p className="micro-label">A FLAGSHIP PROOF POINT</p><h2 className="chapter-title">ONE CAMPAIGN.<br /><em>GLOBAL REACH.</em></h2><p>“Bella Ciao [Lyrics]” became a cultural content moment—evidence that the right positioning, packaging, and timing can travel far beyond a first release.</p></div>
              </div>
              <div className="breakthrough-footer"><span>CASE STUDY / BELLA CIAO [LYRICS]</span><span>193M+ PUBLIC VIEWS</span><span>POSITIONING → DISTRIBUTION</span></div>
            </div>
          </div>
        </section>

        <section id="systems" data-chapter="systems" tabIndex={-1} className="story-chapter system-stage">
          <div className="scene-sticky">
            <div className="safe-frame rhythm-layout">
              <div className="second-act-topline"><div className="section-brand"><span className="founder-mark">AS</span><Eyebrow count={chapterCount("systems", "THE METHOD")}>The work behind momentum</Eyebrow></div><span>METHOD / 07</span></div>
              <div className="rhythm-grid">
                <ol className="rhythm-steps"><li><span>01</span><div><b>Listen</b><p>Start with a real audience, culture, and platform context.</p></div></li><li><span>02</span><div><b>Position</b><p>Give each release a clear promise and a reason to be chosen.</p></div></li><li><span>03</span><div><b>Release</b><p>Build content and distribution that make the idea tangible and findable.</p></div></li><li><span>04</span><div><b>Replay</b><p>Turn listener response into the next smarter catalog decision.</p></div></li></ol>
                <div className="rhythm-statement"><p>Not a content treadmill.</p><h2 className="chapter-title">I BUILD<br /><em>CATALOGS<br />THAT RETURN.</em></h2><span>LISTEN → POSITION → RELEASE → REPLAY</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="toolkit" data-chapter="toolkit" tabIndex={-1} className="story-chapter toolkit-stage">
          <div className="safe-frame studio-layout">
              <div className="second-act-topline"><div className="section-brand"><span className="founder-mark">AS</span><Eyebrow count={chapterCount("toolkit", "CAPABILITIES")}>How I make work move</Eyebrow></div><span>CAPABILITIES / 08</span></div>
            <div className="studio-heading"><h2 className="chapter-title">THE QUIET<br />WORK <em>COMPOUNDS.</em></h2><p>These capabilities turned Re:Like Vibes into a catalog audiences could find, replay, and carry into the next brief.</p></div>
            <div className="studio-lanes">{studioLanes.map((lane, index) => <article key={lane.title} className="studio-lane"><span>{String(index + 1).padStart(2, "0")}</span><h3>{lane.title}</h3><p>{lane.note}</p><ul>{lane.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></article>)}</div>
            <div className="studio-footer"><span>MARKETER + CREATOR + OPERATOR</span><span>THE TOOL IS NEVER THE POINT</span></div>
          </div>
        </section>

        <section id="education" data-chapter="education" tabIndex={-1} className="story-chapter education-stage">
          <div className="safe-frame origin-layout">
              <div className="second-act-topline"><div className="section-brand"><span className="founder-mark">AS</span><Eyebrow count={chapterCount("education", "THE PROFILE")}>The person behind the work</Eyebrow></div><span>PROFILE / 09</span></div>
            <div className="origin-card"><div className="origin-intro"><span className="education-mark">ABHAY SREEJITH</span><h2>MARKETER.<br />CREATOR.<br /><em>OPERATOR.</em></h2><p>I work where strategy meets execution—turning audience insight into catalog choices, distribution, and public momentum that improve over time.</p></div><div className="origin-record"><span>EDUCATION</span><b>B.TECH</b><p>Computer Science &amp; Engineering</p><small>SRM Institute of Science and Technology<br />Graduating June 2026</small></div></div>
            <div className="origin-footer"><span>CALICUT, KERALA</span><span>MARKETING EXPERIENCE / 2022 → NOW</span></div>
          </div>
        </section>

        <section id="contact" data-chapter="contact" tabIndex={-1} className="story-chapter contact-stage">
          <div className="safe-frame final-layout">
              <div className="second-act-topline"><div className="section-brand"><span className="founder-mark">AS</span><Eyebrow count={chapterCount("contact", "THE INVITATION")}>Let&apos;s talk marketing</Eyebrow></div><span>CONTACT / 10</span></div>
            <div className="final-main"><p className="final-kicker">The strongest marketing is felt in the moment—and remembered in the return.</p><h2>LET&apos;S BUILD<br />WHAT&apos;S<br /><em>NEXT.</em></h2><p className="final-support">I&apos;m open to marketing, content, growth, and strategy opportunities where strong thinking can become visible progress.</p></div>
            <div className="final-proof"><span>FLAGSHIP CASE / RE:LIKE VIBES</span><span>DIAMOND / 5B+ LIFETIME VIEWS</span><span>SILVER → GOLD → DIAMOND</span></div>
            <div className="contact-action"><MagneticLink href="mailto:abhaysreejith@gmail.com" className="conversation-link" label="OPEN">START A CONVERSATION <ArrowUpRight size={27} /></MagneticLink><div className="contact-details"><a href="https://www.youtube.com/@ReLikeVibes" target="_blank" rel="noreferrer">Flagship case / Re:Like Vibes <ChevronRight size={13} /></a><a href="mailto:abhaysreejith@gmail.com">abhaysreejith@gmail.com</a><a href="https://tinyurl.com/5mackzpb" target="_blank" rel="noreferrer">LinkedIn <ChevronRight size={13} /></a></div></div>
          </div>
        </section>
      </main>
      <footer className="story-footer"><span>ABHAY SREEJITH / MARKETING PORTFOLIO</span><span>FLAGSHIP CASE / RE:LIKE VIBES</span><a href="#opening" data-cursor="TOP"><Plus size={14} /> BACK TO OPENING</a></footer>
    </div>
  );
}
