"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { projectsContent } from "@/lib/projectsContent";
import Pill from "@/components/shared/Pill";
import HrLine from "../ui/HrLine";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsGallery() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Per-row entrance: the screenshot wipes into view while its floating
  // card slides in from the corner it overlaps, staggering its own content.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rows = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-project-row]")
    );
    const timelines: gsap.core.Timeline[] = [];

    rows.forEach((row) => {
      const isRight = row.dataset.cardSide === "right";
      const frame = row.querySelector<HTMLElement>("[data-project-frame]");
      const clip = row.querySelector<HTMLElement>("[data-project-clip]");
      const card = row.querySelector<HTMLElement>("[data-project-card]");
      const revealEls = card
        ? Array.from(card.querySelectorAll<HTMLElement>("[data-reveal]"))
        : [];
      if (!frame) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      if (prefersReducedMotion) {
        tl.from([frame, card, ...revealEls].filter(Boolean), {
          opacity: 0,
          duration: 0.5,
        });
      } else {
        tl.fromTo(
          frame,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        if (clip) {
          tl.fromTo(
            clip,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power3.out" },
            "<"
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, y: 24, x: isRight ? 28 : -28 },
            { opacity: 1, y: 0, x: 0, duration: 0.8, ease: "power3.out" },
            "-=0.55"
          );
        }

        revealEls.forEach((el, i) => {
          tl.fromTo(
            el,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            i === 0 ? "-=0.35" : "-=0.3"
          );
        });
      }

      timelines.push(tl);
    });

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, []);

  return (
    <div ref={stageRef} className="mx-auto flex w-full max-w-5xl flex-col gap-12 sm:gap-28">
      {projectsContent.map((project, index) => {
        const isRight = index % 2 === 0;

        return (
          <div
            key={project.id}
            data-project-row
            data-card-side={isRight ? "right" : "left"}
            className="relative"
          >
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              data-project-frame
              aria-label={`Open live demo of ${project.name}`}
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-orange-soft"
            >
              <div data-project-clip className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.04]"
                />
              </div>
            </a>

            <div
              data-project-card
              className={
                "relative z-10 -mt-8 mx-3 rounded-2xl border border-accent-orange-soft/40 p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6),0_0_45px_-14px_rgba(255,122,60,0.3)] transition-transform duration-500 will-change-transform hover:-translate-y-1 sm:absolute sm:mx-0 sm:mt-0 sm:-bottom-10 sm:w-[300px] lg:w-[320px] " +
                (project.lightScreenshot
                  ? "bg-[#1c1d22]/90 backdrop-blur-xl "
                  : "bg-glass backdrop-blur-xl ") +
                (isRight
                  ? "sm:left-auto sm:right-6 lg:right-10"
                  : "sm:right-auto sm:left-6 lg:left-10")
              }
            >
              <div data-reveal className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight text-accent-orange-soft">
                  {project.name}
                </h3>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.name} source code on GitHub`}
                    title="View source on GitHub"
                    className="shrink-0 rounded-full text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
                  >
                    <SiGithub className="h-5 w-5" />
                  </a>
                )}
              </div>

              <HrLine />

              <p data-reveal className="mb-4 text-[0.85rem] leading-relaxed text-white/70">
                {project.description}
              </p>

              <ul data-reveal className="mb-5 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Pill>{tech}</Pill>
                  </li>
                ))}
              </ul>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="group/cta inline-flex items-center gap-1.5 self-start rounded-full border border-accent-orange-soft/50 px-4 py-2 text-sm font-medium text-accent-orange-soft transition-colors duration-300 hover:bg-accent-orange/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
              >
                View Demo
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                >
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
