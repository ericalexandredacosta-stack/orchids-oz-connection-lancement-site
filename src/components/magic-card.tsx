"use client";

import { type ReactNode, useRef, useState, useCallback } from "react";

export function MagicCard({
  children,
  className = "",
  spotlightColor = "rgba(245, 158, 11, 0.18)",
  borderGradient = "rgba(245, 158, 11, 0.55)",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderGradient?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Border gradient — visible on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at var(--mx,50%) var(--my,50%), ${borderGradient}, transparent 70%)`,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Spotlight glow — visible on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${spotlightColor}, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
