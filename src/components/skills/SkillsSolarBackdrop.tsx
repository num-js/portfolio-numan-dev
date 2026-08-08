"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ORBIT_RINGS = [
  // { size: "min(28vw, 180px)", duration: 48, delay: 0 },
  // { size: "min(42vw, 280px)", duration: 72, delay: -12 },
  // { size: "min(56vw, 380px)", duration: 96, delay: -28 },
  // { size: "min(72vw, 500px)", duration: 128, delay: -40 },
  { size: "min(42vw, 280px)", duration: 48, delay: 0 },
  { size: "min(62vw, 420px)", duration: 72, delay: -12 },
  { size: "min(84vw, 580px)", duration: 96, delay: -28 },
  { size: "min(110vw, 760px)", duration: 128, delay: -40 },
] as const;

const PLANETS = [
  {
    ring: 0,
    size: 10,
    color: "bg-accent-orange-soft",
    glow: "shadow-[0_0_16px_4px_rgba(255,179,122,0.45)]",
    angle: 28,
  },
  {
    ring: 1,
    size: 14,
    color: "bg-accent-blue",
    glow: "shadow-[0_0_18px_5px_rgba(79,184,255,0.4)]",
    angle: 140,
  },
  {
    ring: 1,
    size: 8,
    color: "bg-accent-orange",
    glow: "shadow-[0_0_14px_3px_rgba(255,122,60,0.5)]",
    angle: 250,
  },
  {
    ring: 2,
    size: 12,
    color: "bg-[#f5f2ec]",
    glow: "shadow-[0_0_16px_4px_rgba(245,242,236,0.25)]",
    angle: 80,
  },
  {
    ring: 2,
    size: 7,
    color: "bg-accent-blue",
    glow: "shadow-[0_0_12px_3px_rgba(79,184,255,0.35)]",
    angle: 200,
  },
  {
    ring: 3,
    size: 9,
    color: "bg-accent-orange-soft",
    glow: "shadow-[0_0_14px_3px_rgba(255,179,122,0.35)]",
    angle: 310,
  },
] as const;

const STARS = [
  { top: "8%", left: "12%", size: 2, opacity: 0.35 },
  { top: "14%", left: "78%", size: 1.5, opacity: 0.45 },
  { top: "22%", left: "88%", size: 2, opacity: 0.3 },
  { top: "28%", left: "6%", size: 1.5, opacity: 0.4 },
  { top: "38%", left: "92%", size: 2.5, opacity: 0.25 },
  { top: "48%", left: "4%", size: 1.5, opacity: 0.35 },
  { top: "62%", left: "96%", size: 2, opacity: 0.3 },
  { top: "72%", left: "10%", size: 1.5, opacity: 0.4 },
  { top: "80%", left: "84%", size: 2, opacity: 0.28 },
  { top: "88%", left: "20%", size: 1.5, opacity: 0.35 },
  { top: "18%", left: "42%", size: 1.5, opacity: 0.22 },
  { top: "70%", left: "55%", size: 2, opacity: 0.2 },
] as const;

/**
 * Solar-system backdrop for the Skills section —
 * central sun, concentric orbits, and drifting planet markers.
 */
export default function SkillsSolarBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const sun = root.querySelector<HTMLElement>("[data-solar-sun]");
    const corona = root.querySelector<HTMLElement>("[data-solar-corona]");
    const rings = root.querySelectorAll<HTMLElement>("[data-solar-ring]");

    const ctx = gsap.context(() => {
      if (sun) {
        gsap.to(sun, {
          scale: 1.08,
          duration: 5.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (corona) {
        gsap.to(corona, {
          opacity: 0.55,
          scale: 1.12,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      rings.forEach((ring, i) => {
        const meta = ORBIT_RINGS[i];
        if (!meta) return;
        gsap.to(ring, {
          rotation: 360,
          duration: meta.duration,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Deep space vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_20%,rgba(5,6,10,0.55)_70%,rgba(5,6,10,0.85)_100%)]" />

      {/* Starfield */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#f5f2ec]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Solar system stage — centered on the orbits */}
      <div className="absolute left-1/2 top-[58%] h-[min(72vw,500px)] w-[min(72vw,500px)] -translate-x-1/2 -translate-y-1/2">
        {/* Outer corona bloom */}
        <div
          data-solar-corona
          className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,122,60,0.28)_0%,rgba(255,179,122,0.1)_40%,transparent_70%)] opacity-40 blur-2xl will-change-transform"
        />

        {/* Soft blue monitor wash (secondary planet light) */}
        <div className="absolute left-[62%] top-[38%] h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,184,255,0.16)_0%,transparent_70%)] blur-2xl" />

        {/* Concentric orbit rails + planets */}
        {ORBIT_RINGS.map((ring, ringIndex) => (
          <div
            key={ring.size}
            data-solar-ring
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{
              width: ring.size,
              height: ring.size,
              marginLeft: `calc(${ring.size} / -2)`,
              marginTop: `calc(${ring.size} / -2)`,
            }}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-accent-orange-soft/15" />
            <div className="absolute inset-[3%] rounded-full border border-white/[0.04]" />

            {PLANETS.filter((p) => p.ring === ringIndex).map((planet, pi) => (
              <div
                key={`${ringIndex}-${pi}`}
                className="absolute inset-0"
                style={{ transform: `rotate(${planet.angle}deg)` }}
              >
                <span
                  className={`absolute left-1/2 top-0 block -translate-x-1/2 -translate-y-1/2 rounded-full ${planet.color} ${planet.glow}`}
                  style={{ width: planet.size, height: planet.size }}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Soft sun bloom — the Skills center badge is the real core */}
        <div
          data-solar-sun
          className="absolute left-1/2 top-1/2 h-[min(28vw,200px)] w-[min(28vw,200px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,122,60,0.35)_0%,rgba(255,179,122,0.12)_40%,transparent_68%)] blur-xl" />
          <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(255,179,122,0.2)_0%,transparent_70%)] blur-md" />
        </div>
      </div>
    </div>
  );
}
