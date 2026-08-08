"use client";

import OrbitingCircles from "@/components/ui/orbiting-circles";
import { skillsContent } from "@/lib/skillsContent";

const RING_LAYOUT = [
  { radius: 100, duration: 22, reverse: false },
  { radius: 165, duration: 32, reverse: true },
  { radius: 230, duration: 42, reverse: false },
] as const;

/** Combined multi-ring skills orbit. */
export default function SkillsConstellation() {
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
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-[-28%] rounded-full bg-[radial-gradient(circle,rgba(255,122,60,0.45)_0%,transparent_70%)] blur-md"
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-accent-orange/35 bg-[radial-gradient(circle_at_35%_30%,rgba(255,179,122,0.35)_0%,rgba(11,13,19,0.92)_55%)] text-center shadow-[0_0_50px_-6px_rgba(255,122,60,0.55)] backdrop-blur-xl">
              <span className="px-1 text-[0.68rem] font-semibold uppercase leading-tight tracking-wide text-accent-orange-soft">
                Skills
              </span>
            </div>
          </div>
        }
        showOrbits
        orbitClassName="border-accent-orange-soft/25 border-dashed"
        className="mx-auto"
      />
    </div>
  );
}
