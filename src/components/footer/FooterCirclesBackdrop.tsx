"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Decorative footer backdrop using the original bg-circles artwork.
 * Ambient GSAP motion (float + pulse + soft bloom) — skipped for reduced-motion.
 */
export default function FooterCirclesBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

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

    const ctx = gsap.context(() => {
      gsap.to(cluster, {
        y: -16,
        x: -10,
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
        transformOrigin: "70% 55%",
      });

      gsap.to(bloom, {
        opacity: 0.65,
        scale: 1.12,
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "75% 50%",
      });

      gsap.fromTo(
        sheen,
        { opacity: 0.12, xPercent: -6 },
        {
          opacity: 0.38,
          xPercent: 6,
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft bloom duplicate — deeper glow behind the sharp artwork */}
      <div
        data-circles-bloom
        className="absolute -right-[18%] top-[-35%] h-[170%] w-[min(1200px,140vw)] scale-125 opacity-40 blur-2xl will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/backgrounds/bg-circles.svg"
          alt=""
          className="h-full w-full object-cover object-right"
          draggable={false}
        />
      </div>

      {/* Main artwork: outer float + inner pulse (separate transforms) */}
      <div
        data-circles-cluster
        className="absolute -right-[12%] top-[-28%] h-[160%] w-[min(1100px,130vw)] scale-125 will-change-transform"
      >
        <div
          data-circles-pulse
          className="h-full w-full will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/backgrounds/bg-circles.svg"
            alt=""
            className="h-full w-full object-cover object-right opacity-95"
            draggable={false}
          />
        </div>
      </div>

      {/* Warm practical + cool monitor sheen */}
      <div
        data-circles-sheen
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(255,122,60,0.18),transparent_42%),radial-gradient(ellipse_at_88%_58%,rgba(79,184,255,0.14),transparent_55%)] will-change-transform"
      />
    </div>
  );
}
