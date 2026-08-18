/* Re:Like Vibes design: local tactile feedback feels like a gentle physical pull, stays optional, and never blocks the visitor's task. */
import { type MouseEvent, type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
  label?: string;
  target?: string;
};

export default function MagneticLink({ children, className = "", href, label = "OPEN", target }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || !linkRef.current) return;
    const bounds = linkRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    linkRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (linkRef.current) linkRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={target ? "noreferrer" : undefined}
      className={`magnetic-link ${className}`}
      data-cursor={label}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </a>
  );
}
