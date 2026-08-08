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
            <SectionHeader sectionTitle="Academics"
              sectionIcon={
                <svg version="1.1" id="svg4619" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 15 15">
                  <path id="path9" style={{ fill: 'currentColor' }} d="M7.5,1L0,4.5l2,0.9v1.7C1.4,7.3,1,7.9,1,8.5s0.4,1.2,1,1.4V10l-0.9,2.1  C0.8,13,1,14,2.5,14s1.7-1,1.4-1.9L3,10c0.6-0.3,1-0.8,1-1.5S3.6,7.3,3,7.1V5.9L7.5,8L15,4.5L7.5,1z M11.9,7.5l-4.5,2L5,8.4v0.1  c0,0.7-0.3,1.3-0.8,1.8l0.6,1.4v0.1C4.9,12.2,5,12.6,4.9,13c0.7,0.3,1.5,0.5,2.5,0.5c3.3,0,4.5-2,4.5-3L11.9,7.5L11.9,7.5z" />
                </svg>
              }
            />
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
