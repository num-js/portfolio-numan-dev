"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { SkillCategory } from "@/lib/skillsContent";

type OrbitClusterProps = {
  category: SkillCategory;
  index: number;
};

const ICON_SIZE = 44; // px, must match the h-11/w-11 icon button below

export default function OrbitCluster({ category, index }: OrbitClusterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const radiusRef = useRef(100);

  useEffect(() => {
    const container = containerRef.current;
    const icons = iconRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!container || icons.length === 0) return;

    const count = icons.length;
    const phaseOffset = index * 25;
    const direction = index % 2 === 0 ? 1 : -1;
    const duration = 34 + index * 7;

    const measure = () => {
      radiusRef.current = container.clientWidth / 2 - ICON_SIZE / 2 - 8;
    };
    measure();

    const baseAngles = icons.map((_, i) => (i / count) * 360 + phaseOffset);

    icons.forEach((icon, i) => {
      const rad = (baseAngles[i] * Math.PI) / 180;
      gsap.set(icon, {
        xPercent: -50,
        yPercent: -50,
        x: Math.cos(rad) * radiusRef.current,
        y: Math.sin(rad) * radiusRef.current,
      });
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let tween: gsap.core.Tween | undefined;

    if (!prefersReducedMotion) {
      const proxy = { angle: 0 };
      tween = gsap.to(proxy, {
        angle: 360 * direction,
        duration,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          const r = radiusRef.current;
          icons.forEach((icon, i) => {
            const rad = ((baseAngles[i] + proxy.angle) * Math.PI) / 180;
            gsap.set(icon, { x: Math.cos(rad) * r, y: Math.sin(rad) * r });
          });
        },
      });
    }

    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);

    const handleEnter = (icon: HTMLButtonElement) => {
      tween?.pause();
      gsap.to(icon, { scale: 1.22, duration: 0.4, ease: "power3.out" });
      const glow = icon.querySelector("[data-glow]");
      if (glow) gsap.to(glow, { opacity: 1, duration: 0.4, ease: "power3.out" });
      const tooltip = icon.querySelector("[data-tooltip]");
      if (tooltip) gsap.to(tooltip, { opacity: 1, y: -6, duration: 0.3 });
    };

    const handleLeave = (icon: HTMLButtonElement) => {
      tween?.resume();
      gsap.to(icon, { scale: 1, duration: 0.4, ease: "power3.out" });
      const glow = icon.querySelector("[data-glow]");
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.35, ease: "power3.out" });
      const tooltip = icon.querySelector("[data-tooltip]");
      if (tooltip) gsap.to(tooltip, { opacity: 0, y: 0, duration: 0.25 });
    };

    const cleanups: (() => void)[] = [];
    icons.forEach((icon) => {
      const onEnter = () => handleEnter(icon);
      const onLeave = () => handleLeave(icon);
      icon.addEventListener("mouseenter", onEnter);
      icon.addEventListener("mouseleave", onLeave);
      icon.addEventListener("focus", onEnter);
      icon.addEventListener("blur", onLeave);
      cleanups.push(() => {
        icon.removeEventListener("mouseenter", onEnter);
        icon.removeEventListener("mouseleave", onLeave);
        icon.removeEventListener("focus", onEnter);
        icon.removeEventListener("blur", onLeave);
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanups.forEach((fn) => fn());
      tween?.kill();
    };
  }, [category, index]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-[min(72vw,260px)] lg:w-[280px]"
      >
        <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-glass-border bg-glass text-center shadow-[0_0_40px_-8px_rgba(255,122,60,0.4)] backdrop-blur-xl lg:h-20 lg:w-20">
          <span className="px-1 text-[0.6rem] font-semibold uppercase leading-tight tracking-wide text-accent-orange-soft lg:text-[0.68rem]">
            {category.label}
          </span>
        </div>

        {category.skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <button
              key={skill.name}
              type="button"
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              aria-label={skill.name}
              className="absolute left-1/2 top-1/2 z-20 flex h-11 w-11 cursor-default items-center justify-center rounded-full border border-white/[0.08] bg-ink text-white/70 transition-colors duration-300 hover:border-white/20 hover:text-white focus-visible:border-white/20 focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
            >
              <span
                data-glow
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-8px] rounded-full opacity-0"
                style={{ boxShadow: `0 0 24px 6px ${skill.color}55` }}
              />
              <Icon aria-hidden="true" className="relative h-5 w-5" />
              <span
                data-tooltip
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-glass-border bg-ink px-2.5 py-1 text-[0.65rem] font-medium text-[#f5f2ec] opacity-0 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]"
              >
                {skill.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
