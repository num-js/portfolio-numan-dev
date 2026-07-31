"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AcademicsIllustration() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const floatInnerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const floatTarget = floatRef.current;
    const floatInner = floatInnerRef.current;
    const bubble = bubbleRef.current;
    if (!scene || !floatTarget || !floatInner || !bubble) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const entrance = gsap.fromTo(
      bubble,
      { opacity: 0, scale: 0.92, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scene,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const imageEntrance = gsap.fromTo(
      floatTarget,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scene,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );

    let floatTween: gsap.core.Tween | undefined;
    if (!prefersReducedMotion) {
      floatTween = gsap.to(floatInner, {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      entrance.scrollTrigger?.kill();
      entrance.kill();
      imageEntrance.scrollTrigger?.kill();
      imageEntrance.kill();
      floatTween?.kill();
    };
  }, []);

  return (
    <div ref={sceneRef} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
      {/* <div
        ref={bubbleRef}
        className="relative z-10 mx-auto mb-6 max-w-[280px] -rotate-2 rounded-2xl border border-glass-border bg-glass px-4 py-3 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:max-w-[300px] lg:absolute lg:left-[8%] lg:top-[-20%] lg:mb-0 lg:max-w-[260px]"
      >
        <Image
          src="/images/num-heart.gif"
          alt=""
          width={28}
          height={28}
          unoptimized
          aria-hidden="true"
          className="absolute -right-1 -top-2.5 h-7 w-7"
        />
        <p className="text-[0.9rem] leading-relaxed text-white/90">
          Degree can&apos;t fix bugs.
          <br />
          My{" "}
          <Link
            href="#skills"
            className="font-bold text-accent-orange-soft underline decoration-accent-orange-soft/40 underline-offset-2 transition-colors duration-300 hover:text-accent-orange hover:decoration-accent-orange-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
          >
            Skills
          </Link>{" "}
          can. 😎
        </p>
      </div> */}

      <div ref={floatRef} className="relative mx-auto w-[min(100%,360px)] lg:w-full">
        <div ref={floatInnerRef} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-[18%] h-24 w-24 rounded-full bg-accent-blue/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 bottom-[12%] h-28 w-28 rounded-full bg-accent-orange/12 blur-3xl"
          />
          <Image
            src="/images/numan-learning.png"
            alt="Illustration of Numan studying with a laptop on a stack of books"
            width={520}
            height={520}
            priority={false}
            className="move-up-down 2s linear infinite relative z-[1] h-auto w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </div>
  );
}
