"use client";

import OrbitingCircles from "@/components/ui/orbiting-circles";
import { skillsContent, type Skill } from "@/lib/skillsContent";

function SkillOrbitIcon({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-ink text-white/75 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)] transition-colors duration-300 hover:border-white/20 hover:text-white"
      style={{ boxShadow: `0 0 22px -6px ${skill.color}66` }}
    >
      <Icon aria-hidden="true" className="relative h-5 w-5" />
    </div>
  );
}

/** One OrbitingCircles cluster per skill category (Frontend / Backend / Tools). */
export default function SkillsCategoryOrbits() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-6">
      {skillsContent.map((category, index) => (
        <div key={category.id} className="flex items-center justify-center">
          <OrbitingCircles
            rings={[
              {
                radius: 110,
                duration: 24 + index * 6,
                reverse: index % 2 === 1,
                items: category.skills.map((skill) => ({
                  id: `${category.id}-${skill.name}`,
                  title: skill.name,
                  icon: <SkillOrbitIcon skill={skill} />,
                })),
              },
            ]}
            centerContent={
              <div className="relative flex h-16 w-16 items-center justify-center lg:h-20 lg:w-20">
                <span
                  aria-hidden="true"
                  className="absolute inset-[-24%] rounded-full bg-[radial-gradient(circle,rgba(255,122,60,0.4)_0%,transparent_70%)] blur-md"
                />
                <div className="relative flex h-full w-full items-center justify-center rounded-full border border-accent-orange/30 bg-[radial-gradient(circle_at_35%_30%,rgba(255,179,122,0.3)_0%,rgba(11,13,19,0.92)_55%)] text-center shadow-[0_0_40px_-6px_rgba(255,122,60,0.5)] backdrop-blur-xl">
                  <span className="px-1 text-[0.6rem] font-semibold uppercase leading-tight tracking-wide text-accent-orange-soft lg:text-[0.68rem]">
                    {category.label}
                  </span>
                </div>
              </div>
            }
            showOrbits
            orbitClassName="border-accent-orange-soft/25 border-dashed"
            className="mx-auto scale-[0.92] lg:scale-100"
          />
        </div>
      ))}
    </div>
  );
}
