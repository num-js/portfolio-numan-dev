"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsContent } from "@/lib/skillsContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Static grid used on small screens (no room for an orbit) and whenever
 * prefers-reduced-motion is set (no ambient motion at all). Still gets a
 * one-time scroll-triggered stagger reveal, since that's a direct response
 * to scrolling, not ambient/looping motion.
 */
export default function SkillsGridFallback() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const groups = container.querySelectorAll("[data-skill-group]");
    if (prefersReducedMotion) return;

    const tween = gsap.fromTo(
      groups,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      {skillsContent.map((category) => (
        <div key={category.id} data-skill-group>
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-accent-orange-soft">
            {category.label}
          </p>
          <ul className="flex flex-wrap gap-3">
            {category.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <li
                  key={skill.name}
                  className="flex items-center gap-2 rounded-full border border-glass-border bg-glass px-3.5 py-2 text-sm text-white/80 backdrop-blur-xl"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
                  {skill.name}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
