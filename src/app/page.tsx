import VideoIntro from "@/components/hero/VideoIntro";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import SkillsShowcase from "@/components/skills/SkillsShowcase";
import AcademicsSection from "@/components/academics/AcademicsSection";
import SectionHeader from "@/components/shared/SectionHeader";
import HeroDock from "@/components/hero/HeroDock";
import SkillsSolarBackdrop from "@/components/skills/SkillsSolarBackdrop";

export default function Home() {
  return (
    <main className="relative">
      <VideoIntro />

      <section
        id="experience"
        className="relative z-[1] rounded-t-[40px] bg-ink px-6 pt-8 pb-16 shadow-[0_-60px_120px_-40px_rgba(0,0,0,0.7)] sm:px-10 lg:px-24 lg:pt-10 lg:pb-28"
      >
        <div className="mx-auto mb-16 max-w-[760px] text-center lg:mb-20">
          <div className="mb-5">
            <SectionHeader sectionTitle="Experience" />
          </div>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            A timeline of teams I&apos;ve built with, problems I&apos;ve
            shipped through, and the craft I&apos;ve sharpened along the way.
          </p>
        </div>

        <ExperienceTimeline />
      </section>

      <section
        id="skills"
        className="relative z-[1] overflow-hidden border-t border-white/6 bg-ink px-6 pt-8 pb-16 sm:px-10 lg:px-24 lg:pt-10 lg:pb-28"
      >
        <SkillsSolarBackdrop />

        <div className="relative mx-auto mb-4 max-w-[760px] text-center lg:mb-8">
          <div className="mb-5">
            <SectionHeader sectionTitle="Skills" />
          </div>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            The languages, frameworks, and tools orbiting every project I
            build — hover to slow things down and take a closer look.
          </p>
        </div>

        <div className="relative">
          <SkillsShowcase />
        </div>
      </section>

      <section
        id="projects"
        className="relative z-[1] border-t border-white/6 bg-ink px-6 pt-8 pb-16 sm:px-10 lg:px-24 lg:pt-10 lg:pb-28"
      >
        <div className="mx-auto mb-16 max-w-[760px] text-center lg:mb-20">
          <div className="mb-5">
            <SectionHeader sectionTitle="Projects" />
          </div>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            A few things I&apos;ve shipped recently — real products, live in
            the wild, built end to end.
          </p>
        </div>

        <ProjectsGallery />
      </section>

      <section
        id="academics"
        className="relative z-[1] border-t border-white/6 bg-ink px-6 pt-8 pb-16 sm:px-10 lg:px-24 lg:pt-10 lg:pb-28"
      >
        <div className="mx-auto mb-30 max-w-[760px] text-center lg:mb-20">
          <div className="mb-5">
            <SectionHeader sectionTitle="Academics" />
          </div>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            Where the formal training started — degrees on paper, curiosity
            that outlasted the syllabus.
          </p>
        </div>

        <AcademicsSection />
      </section>

      <HeroDock />
    </main>
  );
}
