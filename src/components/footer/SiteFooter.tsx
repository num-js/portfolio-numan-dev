"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import FooterBrand from "./FooterBrand";
import {
  footerBio,
  footerNavLinks,
  footerSkillHighlights,
  socialLinks,
} from "@/lib/footerContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialIcons = {
  github: SiGithub,
  gmail: SiGmail,
  whatsapp: SiWhatsapp,
  linkedin: null,
  phone: null,
} as const;

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
    <footer ref={footerRef} className="relative z-[1] mt-auto">
      <div className="relative">
        <div className="absolute right-0 top-[-64px]">
          <div className="flex justify-end px-[clamp(1.25rem,6vw,6rem)]">
            <Image
              src="/images/plant-blue.svg"
              alt=""
              width={120}
              height={120}
              aria-hidden="true"
              className="h-16 w-auto opacity-90 sm:h-20 lg:mr-12"
            />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/6 bg-glass/90 backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[8%] top-[10%] h-[220px] w-[220px] rounded-full bg-accent-orange/8 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6%] bottom-[8%] h-[200px] w-[200px] rounded-full bg-accent-blue/10 blur-[65px]"
        />

        <div className="relative mx-auto max-w-6xl px-[clamp(1.25rem,6vw,6rem)] py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
              <div data-footer-col>
                <FooterBrand />
                <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-white/65">
                  {footerBio}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {socialLinks.map(({ label, href, icon }) => {
                    const Icon = socialIcons[icon];
                    return (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        aria-label={label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass text-white/75 transition-all duration-300 hover:border-accent-orange-soft/45 hover:text-accent-orange-soft hover:shadow-[0_0_20px_rgba(255,122,60,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
                      >
                        {icon === "phone" ? (
                          <PhoneIcon className="h-5 w-5" />
                        ) : icon === "linkedin" ? (
                          <LinkedInIcon className="h-5 w-5" />
                        ) : (
                          Icon && <Icon className="h-5 w-5" />
                        )}
                      </a>
                    );
                  })}
                </div>
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
                  className="min-w-0 flex-1 rounded-l-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40"
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
