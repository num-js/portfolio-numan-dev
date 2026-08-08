"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterBrand from "./FooterBrand";
import SocialLinks from "@/components/shared/SocialLinks";
import ResumeDownloadLink from "@/components/shared/ResumeDownloadLink";
import {
  footerBio,
  footerNavLinks,
  footerSkillHighlights,
} from "@/lib/footerContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const columns = Array.from(
      footer.querySelectorAll<HTMLElement>("[data-footer-col]")
    );

    const tween = prefersReducedMotion
      ? gsap.from(columns, { opacity: 0, duration: 0.35 })
      : gsap.fromTo(
        columns,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: footer,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative z-[60] mt-auto">
      <div className="relative">
        <div className="absolute right-0 top-[-64px]">
          <div className="flex justify-end px-[clamp(1.25rem,6vw,6rem)]">
            <Image
              src="/images/plant.svg"
              alt=""
              width={120}
              height={120}
              aria-hidden="true"
              className="h-16 w-auto opacity-90 sm:h-20 lg:mr-12"
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/6 bg-glass/90 backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[8%] top-[10%] h-[min(220px,45vw)] w-[min(220px,45vw)] rounded-full bg-accent-orange/8 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] bottom-[8%] h-[min(200px,40vw)] w-[min(200px,40vw)] rounded-full bg-accent-blue/10 blur-[65px]"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
              <div data-footer-col>
                <FooterBrand />
                <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-white/65">
                  {footerBio}
                </p>
                <SocialLinks className="mt-6 flex flex-wrap gap-3" />
                <ResumeDownloadLink className="mt-6" />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <nav data-footer-col aria-label="Footer navigation">
                  <h2 className="mb-4 text-base font-bold text-[#f5f2ec]">Links</h2>
                  <ul className="space-y-2 text-sm">
                    {footerNavLinks.map(({ label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          className="font-medium text-white/70 transition-colors duration-300 hover:text-accent-orange-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div data-footer-col>
                  <h2 className="mb-4 text-base font-bold text-[#f5f2ec]">Skills</h2>
                  <ul className="space-y-2 text-sm text-white/70">
                    {footerSkillHighlights.map((skill) => (
                      <li key={skill} className="font-medium">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div data-footer-col>
              <h2 className="mb-4 text-base font-bold text-[#f5f2ec]">Newsletter</h2>
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                Subscribe to my weekly newsletter to get updates about tech.
              </p>
              <p className="sr-only">Newsletter signup coming soon.</p>
              <div className="flex max-w-md" aria-hidden="true">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-l-lg border border-accent-orange-soft/40 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40"
                />
                <button
                  type="button"
                  title="Subscribe"
                  className="rounded-r-lg border border-accent-orange/40 bg-accent-orange px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6 bg-[rgba(6,10,16,0.92)]">
        <div className="mx-auto max-w-6xl px-[clamp(1.25rem,6vw,6rem)] py-6 text-center">
          <p className="mb-2 text-sm text-white/65">
            © 2020 – {currentYear} Md Numan Ahmed. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-white/65">
            <span>Designed &amp; Developed with</span>
            <Image
              src="/images/num-heart.gif"
              alt=""
              width={20}
              height={20}
              unoptimized
              aria-hidden="true"
              className="inline h-5 w-5"
            />
            <span>by</span>
            <FooterBrand size="sm" linked={false} />
          </p>
        </div>
      </div>
    </footer>
  );
}
