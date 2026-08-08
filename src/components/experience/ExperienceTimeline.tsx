"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experienceData from "../../lib/experienceData.json";
import HrLine from "../ui/HrLine";
import Pill from "@/components/shared/Pill";
import Image from "next/image";
import { getDuration, getMonthNameYear } from "@/utils/getDate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-timeline-item]")
    );
    const rail = container.querySelector("[data-timeline-rail]");
    const timelines: gsap.core.Timeline[] = [];

    items.forEach((item, index) => {
      const fromX = index % 2 === 0 ? -24 : 24;
      const bullets = Array.from(
        item.querySelectorAll<HTMLElement>("[data-experience-bullet]")
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (prefersReducedMotion) {
        tl.from([item, ...bullets], { opacity: 0, duration: 0.4 });
      } else {
        tl.fromTo(
          item,
          { opacity: 0, y: 32, x: fromX },
          { opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out" }
        );

        if (bullets.length > 0) {
          tl.fromTo(
            bullets,
            { opacity: 0, y: 12, x: -8 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.08,
            },
            "-=0.35"
          );
        }
      }

      timelines.push(tl);
    });

    let railTween: gsap.core.Tween | undefined;
    if (rail) {
      railTween = gsap.fromTo(
        rail,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
      railTween?.scrollTrigger?.kill();
      railTween?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-5xl">
      <div
        data-timeline-rail
        className="pointer-events-none absolute left-[18px] top-0 h-full w-px bg-[linear-gradient(to_bottom,rgba(255,179,122,0.4),rgba(255,255,255,0.15),transparent)] lg:left-1/2"
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-12 lg:gap-16">
        {experienceData.map((entry, index) => {
          const isRight = index % 2 === 1;
          return (
            <li key={`${entry.company}-${entry.start}`} data-timeline-item className="relative pl-12 lg:pl-0">
              <span
                className="absolute left-[18px] top-1 z-10 inline-flex h-8 min-w-8 max-w-[3.75rem] -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-full border border-glass-border bg-ink px-1.5 text-[0.62rem] font-semibold uppercase tracking-wide text-accent-orange-soft shadow-[0_0_0_4px_var(--color-ink),0_0_20px_rgba(255,122,60,0.25)] lg:left-1/2 lg:h-10 lg:min-w-10 lg:px-2 lg:text-[0.7rem]"
              >
                {getDuration(entry.start || "", entry.end || "")}
              </span>

              <div
                className={
                  "rounded-2xl border border-accent-orange-soft/40 bg-glass p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:w-[calc(50%-2.75rem)] lg:p-6 " +
                  (isRight ? "lg:ml-[calc(50%+2.75rem)]" : "")
                }
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-accent-orange),var(--color-accent-orange-soft))] text-sm font-bold text-ink">
                    {entry?.companyLogo ? <Image className="h-full w-full object-contain rounded-full" src={entry.companyLogo} alt={entry.company} width={48} height={48} /> : initials(entry.company)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-[#f5f2ec] lg:text-lg">
                      {entry.company}
                    </h3>
                    <p className="truncate text-sm text-white/70">{entry.role}</p>
                  </div>
                </div>

                <p className="mt-2 text-xs text-white/50">
                  {getMonthNameYear(entry?.start || '')} — {' '}
                  {!entry?.end
                    ? 'Present'
                    : getMonthNameYear(entry?.end || '')}
                </p>

                <div className="mt-4 text-[0.9rem] leading-relaxed text-white/70">
                  <div dangerouslySetInnerHTML={{ __html: entry.description }} />
                </div>

                {entry.bulletPoints?.length ? (
                  <ul className="mt-3 list-disc space-y-2 pl-4 marker:text-white/35">
                    {entry.bulletPoints.map((html, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        data-experience-bullet
                        className="text-[0.88rem] leading-relaxed text-white/70 [&_strong]:font-semibold [&_strong]:text-white/85"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    ))}
                  </ul>
                ) : null}

                <HrLine direction="right" />

                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.skills.map((skill) => (
                    <li key={skill}>
                      <Pill>{skill}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
