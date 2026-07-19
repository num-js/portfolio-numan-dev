"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { projectsContent } from "@/lib/projectsContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TILT_MAX_DEG = 6;

export default function ProjectsGallery() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [enableTilt, setEnableTilt] = useState(false);

  // Gate the pointer-tilt on the screenshots — direct-response interaction
  // only, for hover-capable, motion-comfortable visitors.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      setEnableTilt(!motionQuery.matches && pointerQuery.matches);
    };
    update();

    motionQuery.addEventListener("change", update);
    pointerQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      pointerQuery.removeEventListener("change", update);
    };
  }, []);

  // Per-row entrance: the screenshot wipes into view while its copy
  // staggers in from the side it's anchored to.
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
      const isLeftImage = row.dataset.imageSide === "left";
      const frame = row.querySelector<HTMLElement>("[data-project-frame]");
      const clip = row.querySelector<HTMLElement>("[data-project-clip]");
      const revealEls = Array.from(
        row.querySelectorAll<HTMLElement>("[data-reveal]")
      );
      if (!frame) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      if (prefersReducedMotion) {
        tl.from([frame, ...revealEls], { opacity: 0, duration: 0.5 });
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

        const textFrom = isLeftImage ? 32 : -32;
        revealEls.forEach((el, i) => {
          tl.fromTo(
            el,
            { opacity: 0, x: textFrom },
            { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
            i === 0 ? "-=0.65" : "-=0.5"
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

  // Subtle 3D tilt + lift on the screenshot itself, following the cursor.
  useEffect(() => {
    if (!enableTilt) return;
    const stage = stageRef.current;
    if (!stage) return;

    const frames = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-project-frame]")
    );
    const cleanups: (() => void)[] = [];

    frames.forEach((frame) => {
      // Seed GSAP's transform cache with these exact properties up front —
      // otherwise quickTo has to decompose the CSS matrix left by the
      // entrance tween's `y`, which it can't always do cleanly for 3D
      // rotation and warns "not eligible for reset".
      gsap.set(frame, { rotationX: 0, rotationY: 0, scale: 1 });

      const setRotateX = gsap.quickTo(frame, "rotateX", {
        duration: 0.6,
        ease: "power3.out",
      });
      const setRotateY = gsap.quickTo(frame, "rotateY", {
        duration: 0.6,
        ease: "power3.out",
      });
      const setScale = gsap.quickTo(frame, "scale", {
        duration: 0.6,
        ease: "power3.out",
      });

      const handleMove = (event: PointerEvent) => {
        const rect = frame.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        setRotateX((0.5 - py) * TILT_MAX_DEG);
        setRotateY((px - 0.5) * TILT_MAX_DEG);
        setScale(1.03);
      };

      const handleLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setScale(1);
      };

      frame.addEventListener("pointermove", handleMove);
      frame.addEventListener("pointerleave", handleLeave);
      cleanups.push(() => {
        frame.removeEventListener("pointermove", handleMove);
        frame.removeEventListener("pointerleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [enableTilt]);

  return (
    <div
      ref={stageRef}
      className="mx-auto flex w-full max-w-6xl flex-col gap-20 lg:gap-28"
    >
      {projectsContent.map((project, index) => {
        const isLeftImage = index % 2 === 0;
        const accentText = isLeftImage ? "text-accent-orange-soft" : "text-accent-blue";
        const accentGlow = isLeftImage ? "bg-accent-orange/25" : "bg-accent-blue/20";
        const accentDot = isLeftImage ? "bg-accent-orange" : "bg-accent-blue";
        const accentBorder = isLeftImage
          ? "hover:border-accent-orange/30"
          : "hover:border-accent-blue/30";

        return (
          <div
            key={project.id}
            data-project-row
            data-image-side={isLeftImage ? "left" : "right"}
            className={
              "flex flex-col gap-8 lg:items-center lg:gap-16 " +
              (isLeftImage ? "lg:flex-row" : "lg:flex-row-reverse")
            }
          >
            <div className="relative w-full perspective-[1000px] lg:w-[58%]">
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -z-10 h-40 w-40 rounded-full opacity-50 blur-3xl lg:h-64 lg:w-64 lg:blur-[90px] ${accentGlow} ${
                  isLeftImage ? "-bottom-8 -left-8" : "-bottom-8 -right-8"
                }`}
              />

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-project-frame
                aria-label={`Open live demo of ${project.name}`}
                className={`group relative block aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.75)] transition-colors duration-500 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-orange-soft ${accentBorder}`}
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

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                  <span className={`h-1.5 w-1.5 rounded-full animate-pulse-dot ${accentDot}`} />
                  <span className="text-[0.65rem] font-medium uppercase tracking-wide text-white/85">
                    Live
                  </span>
                </div>
              </a>
            </div>

            <div className="w-full lg:w-[42%]">
              <div data-reveal className="mb-3 flex items-start justify-between gap-3">
                <h3 className={`text-2xl font-bold tracking-tight ${accentText}`}>
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

              <p
                data-reveal
                className="mb-5 max-w-[46ch] text-[0.95rem] leading-relaxed text-white/70"
              >
                {project.description}
              </p>

              <ul data-reveal className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] text-white/65"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="group/cta inline-flex items-center gap-1.5 self-start rounded-full border border-accent-orange/40 bg-accent-orange/10 px-4 py-2 text-sm font-medium text-accent-orange-soft transition-colors duration-300 hover:bg-accent-orange/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
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
