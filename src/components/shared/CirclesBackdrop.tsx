"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type CirclesBackdropProps = {
  /** Which side the orb cluster anchors to. */
  side?: "left" | "right";
  /** Extra classes on the root layer. */
  className?: string;
};

/**
 * Theme-colored glowing orb backdrop (bg-circles.svg) with ambient GSAP motion.
 * Skipped for prefers-reduced-motion.
 */
export default function CirclesBackdrop({
  side = "right",
  className = "",
}: CirclesBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isLeft = side === "left";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const cluster = root.querySelector<HTMLElement>("[data-circles-cluster]");
    const pulse = root.querySelector<HTMLElement>("[data-circles-pulse]");
    const bloom = root.querySelector<HTMLElement>("[data-circles-bloom]");
    const sheen = root.querySelector<HTMLElement>("[data-circles-sheen]");
    if (!cluster || !pulse || !bloom || !sheen) return;

    const driftX = isLeft ? 10 : -10;
    const origin = isLeft ? "30% 55%" : "70% 55%";
    const bloomOrigin = isLeft ? "25% 50%" : "75% 50%";

    const ctx = gsap.context(() => {
      gsap.to(cluster, {
        y: -16,
        x: driftX,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(pulse, {
        scale: 1.08,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: origin,
      });

      gsap.to(bloom, {
        opacity: 0.65,
        scale: 1.12,
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: bloomOrigin,
      });

      gsap.fromTo(
        sheen,
        { opacity: 0.12, xPercent: isLeft ? 6 : -6 },
        {
          opacity: 0.38,
          xPercent: isLeft ? -6 : 6,
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }, root);

    return () => ctx.revert();
  }, [isLeft]);

  const objectSide = isLeft ? "object-left" : "object-right";
  const flip = isLeft ? "-scale-x-100" : "";
  const sheenGradient = isLeft
    ? "bg-[radial-gradient(ellipse_at_22%_42%,rgba(255,122,60,0.18),transparent_42%),radial-gradient(ellipse_at_12%_58%,rgba(79,184,255,0.14),transparent_55%)]"
    : "bg-[radial-gradient(ellipse_at_78%_42%,rgba(255,122,60,0.18),transparent_42%),radial-gradient(ellipse_at_88%_58%,rgba(79,184,255,0.14),transparent_55%)]";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        data-circles-bloom
        className={`absolute top-[-35%] h-[170%] w-[min(1200px,140vw)] scale-125 opacity-40 blur-2xl will-change-transform ${
          isLeft ? "-left-[18%]" : "-right-[18%]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/backgrounds/bg-circles.svg"
          alt=""
          className={`h-full w-full object-cover ${objectSide} ${flip}`}
          draggable={false}
        />
      </div>

      <div
        data-circles-cluster
        className={`absolute top-[-28%] h-[160%] w-[min(1100px,130vw)] scale-125 will-change-transform ${
          isLeft ? "-left-[12%]" : "-right-[12%]"
        }`}
      >
        <div data-circles-pulse className="h-full w-full will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/backgrounds/bg-circles.svg"
            alt=""
            className={`h-full w-full object-cover opacity-95 ${objectSide} ${flip}`}
            draggable={false}
          />
        </div>
      </div>

      <div
        data-circles-sheen
        className={`absolute inset-0 will-change-transform ${sheenGradient}`}
      />
    </div>
  );
}
