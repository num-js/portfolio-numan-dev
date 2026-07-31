import VideoIntro from "@/components/hero/VideoIntro";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import SkillsConstellation from "@/components/skills/SkillsConstellation";

export default function Home() {
  return (
    <main className="relative">
      <VideoIntro />

      <section
        id="experience"
        className="relative z-[1] rounded-t-[clamp(20px,3vw,40px)] bg-ink px-[clamp(1.25rem,6vw,6rem)] py-[clamp(4rem,12vh,7rem)] shadow-[0_-60px_120px_-40px_rgba(0,0,0,0.7)]"
      >
        <div className="mx-auto mb-16 max-w-[760px] text-center lg:mb-20">
          <p className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-accent-orange-soft">
            Career Path
          </p>
          <h2 className="mb-5 text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.01em] text-[#f5f2ec]">
            Experience
          </h2>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            A timeline of teams I&apos;ve built with, problems I&apos;ve
            shipped through, and the craft I&apos;ve sharpened along the way.
          </p>
        </div>

        <ExperienceTimeline />
      </section>

      <section
        id="skills"
        className="relative z-[1] border-t border-white/6 bg-ink px-[clamp(1.25rem,6vw,6rem)] py-[clamp(4rem,12vh,7rem)]"
      >
        <div className="mx-auto mb-16 max-w-[760px] text-center lg:mb-20">
          <p className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-accent-orange-soft">
            Toolkit
          </p>
          <h2 className="mb-5 text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.01em] text-[#f5f2ec]">
            Skills
          </h2>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            The languages, frameworks, and tools orbiting every project I
            build — hover to slow things down and take a closer look.
          </p>
        </div>

        <SkillsConstellation />
      </section>
    </main>
  );
}
