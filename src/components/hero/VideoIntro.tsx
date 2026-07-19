"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicLayer from "./CinematicLayer";
import PlaybackControls from "./PlaybackControls";
import SoundHint from "./SoundHint";
import ScrollIndicator from "./ScrollIndicator";
import { heroContent } from "@/lib/heroContent";
import styles from "./VideoIntro.module.css";

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

  const hasLastName = heroContent.lastName.trim().length > 0;

  // Entrance animation + scroll-linked cinematic fade as the next
  // section slides over this sticky hero.
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const media = mediaRef.current;
    if (!section || !content || !media) return;

    const tagline = content.querySelector(`.${styles.tagline}`);
    const nameLines = content.querySelectorAll(`.${styles.nameLine}`);
    const role = content.querySelector(`.${styles.role}`);
    const description = content.querySelector(`.${styles.description}`);
    const chrome = section.querySelectorAll(`.${styles.chromeItem}`);

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

  // Autoplay both video layers on mount.
  useEffect(() => {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;
    [bg, fg].forEach((video) => {
      if (!video) return;
      video.play().catch(() => {
        setIsPlaying(false);
      });
    });
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
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;
    if (!bg || !fg) return;

    if (isPlaying) {
      bg.pause();
      fg.pause();
    } else {
      bg.play().catch(() => {});
      fg.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
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
    <section ref={sectionRef} className={styles.hero}>
      <div ref={mediaRef} className={styles.mediaLayer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={heroContent.videoSrc}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.bgTint} />

        <div className={styles.fgFrame}>
          <video
            ref={fgVideoRef}
            className={styles.fgVideo}
            src={heroContent.videoSrc}
            muted={isMuted}
            loop
            autoPlay
            playsInline
            preload="auto"
          />
          <div className={styles.frameSheen} />
        </div>
      </div>

      <CinematicLayer className={styles.particles} />

      <div className={styles.vignette} />
      <div className={styles.overlayTop} />
      <div className={styles.overlayBottom} />
      <div className={styles.grain} />

      <div ref={contentRef} className={styles.content}>
        <p className={styles.tagline}>{heroContent.tagline}</p>
        <h1 className={styles.name} aria-label={`${heroContent.firstName} ${heroContent.lastName}`.trim()}>
          <span className={styles.nameLine}>{heroContent.firstName}</span>
          {hasLastName && (
            <span className={styles.nameLine}>{heroContent.lastName}</span>
          )}
        </h1>
        <p className={styles.role}>{heroContent.role}</p>
        <p className={styles.description}>{heroContent.description}</p>
      </div>

      <div className={styles.chromeItem}>
        <PlaybackControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />
      </div>

      <div className={styles.chromeItem}>
        <SoundHint visible={showSoundHint && isMuted} onClick={toggleMute} />
      </div>

      <div className={styles.chromeItem}>
        <ScrollIndicator targetId={heroContent.scrollTargetId} />
      </div>
    </section>
  );
}
