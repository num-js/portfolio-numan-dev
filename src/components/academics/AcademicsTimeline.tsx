"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { academicsContent } from "@/lib/academicsContent";
import CertificateDialog from "./CertificateDialog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GraduationCapIcon() {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 text-ink"
    >
      <path
        fill="currentColor"
        d="M7.5 1 0 4.5l2 .9v1.7C1.4 7.3 1 7.9 1 8.5s.4 1.2 1 1.4V10l-.9 2.1C.8 13 1 14 2.5 14s1.7-1 1.4-1.9L3 10c.6-.3 1-.8 1-1.5S3.6 7.3 3 7.1V5.9L7.5 8 15 4.5 7.5 1zm4.4 6.5-4.5 2-2.4-1.1v.1c0 .7-.3 1.3-.8 1.8l.6 1.4v.1c.1.4.2.8.1 1.2.7.3 1.5.5 2.5.5 3.3 0 4.5-2 4.5-3l-4.5-2z"
      />
    </svg>
  );
}

export default function AcademicsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-academic-item]")
    );
    const rail = container.querySelector("[data-academics-rail]");
    const timelines: gsap.core.Timeline[] = [];
    const tweens: gsap.core.Tween[] = [];

    items.forEach((item) => {
      const badge = item.querySelector("[data-academic-badge]");
      const card = item.querySelector("[data-academic-card]");
      const rows = Array.from(
        item.querySelectorAll<HTMLElement>("[data-sem-row]")
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      if (prefersReducedMotion) {
        tl.from([badge, card, ...rows].filter(Boolean), {
          opacity: 0,
          duration: 0.4,
        });
      } else {
        if (badge) {
          tl.fromTo(
            badge,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" }
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
            "-=0.25"
          );
        }

        if (rows.length > 0) {
          tl.fromTo(
            rows,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
              stagger: 0.06,
            },
            "-=0.35"
          );
        }
      }

      timelines.push(tl);
    });

    if (rail) {
      const railTween = gsap.fromTo(
        rail,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 78%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
      tweens.push(railTween);
    }

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        data-academics-rail
        className="pointer-events-none absolute left-5 top-0 h-full w-px bg-[linear-gradient(to_bottom,rgba(255,179,122,0.45),rgba(255,255,255,0.12),transparent)]"
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-12 lg:gap-16">
        {academicsContent.map((entry) => (
          <li key={entry.id} data-academic-item className="relative pl-14">
            <div
              data-academic-badge
              className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-accent-orange),var(--color-accent-orange-soft))] text-sm font-bold text-ink shadow-[0_0_0_4px_var(--color-ink),0_0_22px_rgba(255,122,60,0.28)]"
            >
              {entry.icon === "college" ? (
                <GraduationCapIcon />
              ) : (
                <span>{entry.icon}</span>
              )}
            </div>

            <div
              data-academic-card
              className="rounded-2xl border border-glass-border bg-glass p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6"
            >
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent-orange-soft">
                {entry.course}
              </p>

              <h3 className="text-base font-semibold leading-snug text-[#f5f2ec] sm:text-lg">
                {entry.board}
              </h3>

              <p className="mt-1 text-sm text-white/55">{entry.institution}</p>

              {entry.stream && (
                <p className="mt-2 text-sm text-white/65">
                  Stream:{" "}
                  <span className="font-medium text-white/80">{entry.stream}</span>
                </p>
              )}

              <p className="mt-2 text-xs text-white/45">{entry.timeline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="text-white/55">{entry.marks.label}</span>
                <span className="font-semibold text-[#f5f2ec]">
                  {entry.marks.percentage}
                </span>
                <CertificateDialog
                  imageSrc={entry.marks.link}
                  title={entry.marks.docTitle}
                  triggerLabel="View certificate"
                />
              </div>

              {entry.marks.semMarks && (
                <div className="mt-6 overflow-x-auto pb-2">
                  <div className="inline-block min-w-[260px] sm:-rotate-2 sm:origin-top-left">
                    <table className="w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.75)]">
                      <thead>
                        <tr>
                          {entry.marks.semMarks.headers.map((header, index) => (
                            <th
                              key={`${entry.id}-header-${index}`}
                              className="border-b border-white/10 px-3 py-2.5 text-left text-[0.68rem] font-semibold uppercase tracking-wide text-white/70"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {entry.marks.semMarks.rows.map((row) => (
                          <tr
                            key={`${entry.id}-${row.sem}`}
                            data-sem-row
                            className="border-b border-white/5 last:border-b-0"
                          >
                            <td className="px-3 py-2 text-sm text-white/80">
                              {row.sem}
                            </td>
                            <td className="px-3 py-2 text-center text-sm font-medium text-[#f5f2ec]">
                              {row.marks}
                            </td>
                            <td className="px-2 py-2 text-right">
                              <CertificateDialog
                                imageSrc={row.link}
                                title={`${row.sem} marksheet`}
                                triggerLabel="View marksheet"
                                compact
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
