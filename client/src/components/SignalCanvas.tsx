/* Re:Like Vibes design: this canvas is a restrained silver-and-gold groove field, never the sole carrier of essential information. */
import { useEffect, useRef } from "react";

export type SignalStage =
  | "signal"
  | "audience"
  | "flow"
  | "grid"
  | "clusters"
  | "network"
  | "loop"
  | "quiet";

type Props = { stage: SignalStage };

type Particle = {
  angle: number;
  drift: number;
  index: number;
  x: number;
  y: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export default function SignalCanvas({ stage }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(stage);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isCompact = window.matchMedia("(max-width: 700px)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const buildParticles = () => {
      const count = isCompact.matches ? 84 : 180;
      particles = Array.from({ length: count }, (_, index) => ({
        angle: Math.random() * Math.PI * 2,
        drift: 0.35 + Math.random() * 0.8,
        index,
        x: width * 0.64 + Math.cos(index * 1.91) * (12 + (index % 9) * 6),
        y: height * 0.65 + Math.sin(index * 1.91) * (7 + (index % 9) * 3),
      }));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildParticles();
    };

    const targetFor = (particle: Particle, current: SignalStage, time: number) => {
      const indexRatio = particle.index / Math.max(particles.length - 1, 1);
      const drift = reduced.matches ? 0 : Math.sin(time * 0.00024 * particle.drift + particle.angle) * 9;
      let targetX = width * 0.5;
      let targetY = height * 0.5;

      if (current === "signal") {
        const ring = Math.floor(particle.index / 12);
        const radius = 10 + ring * 5 + (particle.index % 12) * 0.65;
        const phase = particle.angle + ring * 0.42;
        targetX = width * 0.64 + Math.cos(phase) * radius * 1.18;
        targetY = height * 0.65 + Math.sin(phase) * radius * 0.5;
      }
      if (current === "audience") {
        const radius = 24 + Math.pow(indexRatio, 0.72) * Math.min(width, height) * 0.29;
        targetX = width * 0.64 + Math.cos(particle.angle + time * 0.00002) * radius * 1.08;
        targetY = height * 0.59 + Math.sin(particle.angle + time * 0.00002) * radius * 0.58;
      }
      if (current === "flow") {
        const column = particle.index % 7;
        const row = Math.floor(particle.index / 7);
        targetX = width * (0.15 + column * 0.115);
        targetY = height * (0.28 + (row % 6) * 0.09) + drift;
      }
      if (current === "grid") {
        const column = particle.index % 18;
        const row = Math.floor(particle.index / 18);
        targetX = width * (0.16 + column * 0.041);
        targetY = height * (0.22 + (row % 10) * 0.057) + drift;
      }
      if (current === "clusters") {
        const centers = [
          [0.28, 0.35],
          [0.57, 0.28],
          [0.76, 0.46],
          [0.42, 0.68],
          [0.7, 0.76],
        ];
        const center = centers[particle.index % centers.length];
        const ring = Math.floor(particle.index / centers.length) % 9;
        const radius = 7 + ring * 8;
        targetX = width * center[0] + Math.cos(particle.angle) * radius * 1.45;
        targetY = height * center[1] + Math.sin(particle.angle) * radius;
      }
      if (current === "network") {
        const radius = Math.min(width, height) * (0.11 + (particle.index % 12) * 0.019);
        targetX = width * 0.57 + Math.cos(particle.angle + particle.index * 0.28) * radius;
        targetY = height * 0.51 + Math.sin(particle.angle + particle.index * 0.28) * radius;
      }
      if (current === "loop") {
        const orbit = 0.18 + (particle.index % 5) * 0.035;
        targetX = width * 0.52 + Math.cos(particle.angle + time * 0.00008) * width * orbit;
        targetY = height * 0.52 + Math.sin(particle.angle + time * 0.00008) * height * orbit * 0.68;
      }
      if (current === "quiet") {
        const radius = 12 + (particle.index % 8) * 5;
        targetX = width * 0.5 + Math.cos(particle.angle) * radius;
        targetY = height * 0.58 + Math.sin(particle.angle) * radius;
      }

      return { x: targetX, y: targetY };
    };

    const draw = (time: number) => {
      const current = stageRef.current;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const target = targetFor(particle, current, time);
        particle.x += (target.x - particle.x) * 0.035;
        particle.y += (target.y - particle.y) * 0.035;
      });

      const visible = current === "signal"
        ? Math.min(isCompact.matches ? 28 : 46, particles.length)
        : current === "audience"
          ? Math.min(isCompact.matches ? 52 : 88, particles.length)
          : current === "flow"
            ? Math.min(isCompact.matches ? 28 : 42, particles.length)
          : current === "grid"
            ? 0
          : current === "quiet"
            ? Math.min(28, particles.length)
            : particles.length;
      context.lineWidth = 0.45;
      for (let index = 0; index < visible; index += 1) {
        const particle = particles[index];
        if (current === "flow" && index % 7 !== 6) {
          const next = particles[index + 1];
          if (next) {
            context.strokeStyle = "rgba(183,187,194,0.055)";
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }
        if ((current === "network" || current === "loop") && index % 3 === 0) {
          const next = particles[(index + 29) % visible];
          context.strokeStyle = "rgba(212,175,99,0.12)";
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      }

      for (let index = 0; index < visible; index += 1) {
        const particle = particles[index];
        const emphasis = current === "signal"
          ? index === 0 ? 2.3 : 0.72 + (particle.index % 3) * 0.16
          : current === "audience"
            ? 0.78 + (particle.index % 3) * 0.2
            : current === "flow"
              ? 0.52 + (particle.index % 3) * 0.12
              : 1.05 + (particle.index % 3) * 0.28;
        const isGoldAccent = current === "signal"
          ? index === 0 || index === 17
          : current === "audience"
            ? particle.index % 15 === 0
            : current === "flow"
              ? particle.index === 0
              : particle.index % 7 === 0;
        context.fillStyle = current === "quiet"
          ? "rgba(183,187,194,0.22)"
          : current === "signal"
            ? isGoldAccent ? "rgba(212,175,99,0.42)" : "rgba(183,187,194,0.28)"
            : current === "audience"
              ? isGoldAccent ? "rgba(212,175,99,0.46)" : "rgba(183,187,194,0.36)"
          : current === "flow"
            ? isGoldAccent ? "rgba(212,175,99,0.32)" : "rgba(183,187,194,0.16)"
            : isGoldAccent
            ? "rgba(212,175,99,0.62)"
            : "rgba(183,187,194,0.5)";
        context.beginPath();
        context.arc(particle.x, particle.y, emphasis, 0, Math.PI * 2);
        context.fill();
      }

      if (!reduced.matches) animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
