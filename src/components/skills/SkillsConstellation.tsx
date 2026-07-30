"use client";

import { useEffect, useState } from "react";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import SkillsGridFallback from "./SkillsGridFallback";
import { skillsContent } from "@/lib/skillsContent";

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const RING_LAYOUT = [
  { radius: 100, duration: 22, reverse: false },
  { radius: 165, duration: 32, reverse: true },
  { radius: 230, duration: 42, reverse: false },
] as const;

export default function SkillsConstellation() {
  // SSR-safe default: plain grid until the client confirms room + motion.
  const [showOrbit, setShowOrbit] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const update = () => {
      setShowOrbit(desktopQuery.matches && !motionQuery.matches);
    };
    update();

    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      desktopQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  if (!showOrbit) {
    return <SkillsGridFallback />;
  }

  const rings = skillsContent.map((category, index) => {
    const layout = RING_LAYOUT[index] ?? RING_LAYOUT[RING_LAYOUT.length - 1];

    return {
      radius: layout.radius,
      duration: layout.duration,
      reverse: layout.reverse,
      items: category.skills.map((skill) => {
        const Icon = skill.icon;
        return {
          id: `${category.id}-${skill.name}`,
          title: skill.name,
          icon: (
            <div
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-ink text-white/75 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)] transition-colors duration-300 hover:border-white/20 hover:text-white"
              style={{ boxShadow: `0 0 22px -6px ${skill.color}66` }}
            >
              <Icon aria-hidden="true" className="relative h-5 w-5" />
            </div>
          ),
        };
      }),
    };
  });

  return (
    <div className="flex items-center justify-center">
      <OrbitingCircles
        rings={rings}
        centerContent={
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-glass-border bg-glass text-center shadow-[0_0_40px_-8px_rgba(255,122,60,0.4)] backdrop-blur-xl">
            <span className="px-1 text-[0.68rem] font-semibold uppercase leading-tight tracking-wide text-accent-orange-soft">
              Skills
            </span>
          </div>
        }
        showOrbits
        orbitClassName="border-white/10"
        className="mx-auto"
      />
    </div>
  );
}
