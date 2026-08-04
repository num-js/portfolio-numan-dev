"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicLayer from "./CinematicLayer";
import PlaybackControls from "./PlaybackControls";
import SoundHint from "./SoundHint";
import ScrollIndicator from "./ScrollIndicator";
import HeroDock from "./HeroDock";
import SocialLinks from "@/components/shared/SocialLinks";
import ResumeDownloadLink from "@/components/shared/ResumeDownloadLink";
import { heroContent } from "@/lib/heroContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOUND_HINT_TIMEOUT = 5000;

export default function VideoIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);

  const userPausedRef = useRef(false);
  const heroInViewRef = useRef(true);

  const hasLastName = heroContent.lastName.trim().length > 0;

  function applyPlayback() {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;
    if (!bg || !fg) return;

    const shouldPlay =
      !userPausedRef.current &&
      heroInViewRef.current &&
      document.visibilityState === "visible";

    if (shouldPlay) {
      bg.play().catch(() => setIsPlaying(false));
      fg.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    } else {
      bg.pause();
      fg.pause();
      setIsPlaying(false);
    }
  }

  // Entrance animation + scroll-linked cinematic fade as the next
  // section slides over this sticky hero.
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const media = mediaRef.current;
    if (!section || !content || !media) return;

    const tagline = content.querySelector("[data-hero-tagline]");
    const nameLines = content.querySelectorAll("[data-hero-name-line]");
    const role = content.querySelector("[data-hero-role]");
    const description = content.querySelector("[data-hero-description]");
    const social = content.querySelector("[data-hero-social]");
    const chrome = section.querySelectorAll("[data-hero-chrome]");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.set(section, { opacity: 0 })
      .to(section, { opacity: 1, duration: 1.1, ease: "power2.out" })
      .from(
        media,
        { scale: 1.12, duration: 2.4, ease: "power2.out" },
        0
      )
      .from(
        tagline,
        { y: 24, opacity: 0, duration: 0.9 },
        0.5
      )
      .from(
        nameLines,
        { y: 60, opacity: 0, duration: 1.1, stagger: 0.12 },
        0.62
      )
      .from(
        role,
        { y: 20, opacity: 0, duration: 0.9 },
        0.95
      )
      .from(
        description,
        { y: 16, opacity: 0, duration: 0.9 },
        1.05
      )
      .from(
        social,
        { y: 12, opacity: 0, duration: 0.8 },
        1.15
      )
      .from(
        chrome,
        { opacity: 0, duration: 0.8, stagger: 0.08 },
        1.3
      );

    const scrollFade = gsap.to(content, {
      opacity: 0.15,
      y: -60,
      scale: 0.94,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      scrollFade.scrollTrigger?.kill();
      scrollFade.kill();
    };
  }, []);

  // Play only while the hero is uncovered. The hero is sticky, so observing it
  // alone stays intersecting under later sections — observe the following
  // section and keep playing only while it sits fully below the viewport
  // (paused once it enters, and stays paused after it scrolls past).
  useEffect(() => {
    const section = sectionRef.current;
    const next = section?.nextElementSibling;
    if (!section || !next) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroInViewRef.current =
          entry.boundingClientRect.top > window.innerHeight * 0.08;
        applyPlayback();
      },
      { threshold: [0, 0.08, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(next);

    return () => observer.disconnect();
  }, []);

  // Sound hint appears once things settle, then auto-hides.
  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowSoundHint(true), 1800);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showSoundHint) return;
    const hideTimer = window.setTimeout(
      () => setShowSoundHint(false),
      SOUND_HINT_TIMEOUT
    );
    return () => window.clearTimeout(hideTimer);
  }, [showSoundHint]);

  function togglePlay() {
    userPausedRef.current = isPlaying;
    applyPlayback();
  }

  function toggleMute() {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const nextMuted = !isMuted;
    fg.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowSoundHint(false);
  }

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 isolate h-screen min-h-[560px] w-full overflow-hidden bg-void"
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 z-0 grid place-items-center will-change-transform"
      >
        <video
          ref={bgVideoRef}
          className="absolute inset-0 z-0 h-full w-full scale-[1.22] object-cover blur-[52px] saturate-[1.35] brightness-[0.62]"
          src={heroContent.videoSrc}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-[1] mix-blend-soft-light bg-[radial-gradient(60%_55%_at_30%_30%,rgba(255,122,60,0.22),transparent_70%),radial-gradient(55%_60%_at_78%_75%,rgba(79,184,255,0.16),transparent_70%)]" />

        <div className="relative z-[2] h-screen w-screen overflow-hidden rounded-none border-0 min-[721px]:h-[min(84vh,940px)] min-[721px]:w-[min(94vw,1560px)] min-[721px]:rounded-[clamp(14px,2vw,28px)] min-[721px]:border min-[721px]:border-white/[0.09] min-[721px]:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.65),0_0_120px_-30px_rgba(255,130,70,0.35)]">
          <video
            ref={fgVideoRef}
            className="block h-full w-full object-cover"
            src={heroContent.videoSrc}
            muted={isMuted}
            loop
            autoPlay
            playsInline
            preload="auto"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_18%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.28)_100%)]" />
        </div>
      </div>

      <CinematicLayer />

      <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(120%_90%_at_50%_45%,transparent_45%,rgba(2,3,6,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-[22%] bg-[linear-gradient(to_bottom,rgba(2,3,6,0.55),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[52%] bg-[linear-gradient(to_top,rgba(2,3,6,0.86),transparent)]" />
      <div className="pointer-events-none absolute inset-0 z-[4] opacity-[0.05] mix-blend-overlay bg-[image:var(--grain-url)]" />

      <div
        ref={contentRef}
        className="absolute z-[5] max-w-[min(90vw,720px)] will-change-[transform,opacity] left-[clamp(1.5rem,6vw,6rem)] bottom-[clamp(7.5rem,16vh,10rem)] max-[720px]:left-[1.25rem] max-[720px]:right-[1.25rem] max-[720px]:bottom-[8.5rem] max-[720px]:max-w-none"
      >
        <p
          data-hero-tagline
          className="mb-[clamp(0.75rem,2vw,1.25rem)] text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-accent-orange-soft"
        >
          {heroContent.tagline}
        </p>
        <h1
          className="mb-[clamp(1rem,2.4vw,1.5rem)] flex flex-col text-[clamp(2.2rem,7.5vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-[#f5f2ec] [text-shadow:0_12px_60px_rgba(0,0,0,0.45)]"
          aria-label={`${heroContent.firstName} ${heroContent.lastName}`.trim()}
        >
          <span
            data-hero-name-line
            className="block animate-sheen bg-[linear-gradient(100deg,#ffffff_0%,#ffe9d6_45%,#ffb37a_75%,#ffffff_100%)] bg-clip-text text-transparent [background-size:220%_100%] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-[#f5f2ec]"
          >
            {heroContent.firstName}
          </span>
          {hasLastName && (
            <span
              data-hero-name-line
              className="block animate-sheen bg-[linear-gradient(100deg,#ffffff_0%,#ffe9d6_45%,#ffb37a_75%,#ffffff_100%)] bg-clip-text text-transparent [background-size:220%_100%] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-[#f5f2ec]"
            >
              {heroContent.lastName}
            </span>
          )}
        </h1>
        <p
          data-hero-role
          className="mb-[0.6rem] text-[clamp(1rem,1.6vw,1.3rem)] font-medium text-white/[0.92]"
        >
          {heroContent.role}
        </p>
        <p
          data-hero-description
          className="max-w-[46ch] text-[clamp(0.9rem,1.1vw,1.05rem)] leading-[1.6] text-[#e2e2e8]/[0.72]"
        >
          {heroContent.description}
        </p>
        <div
          data-hero-social
          className="pointer-events-auto mt-5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4"
        >
          <SocialLinks className="flex flex-wrap gap-2.5 sm:gap-3" />
          <ResumeDownloadLink />
        </div>
      </div>

      <div data-hero-chrome>
        <PlaybackControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />
      </div>

      <div data-hero-chrome>
        <SoundHint visible={showSoundHint && isMuted} onClick={toggleMute} />
      </div>

      {/* <div data-hero-chrome>
        <ScrollIndicator targetId={heroContent.scrollTargetId} />
      </div> */}
      
      <div data-hero-chrome>
        <HeroDock />
      </div>
    </section>
  );
}
