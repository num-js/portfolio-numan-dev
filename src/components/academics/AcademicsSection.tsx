import Image from "next/image";
import Link from "next/link";
import AcademicsIllustration from "./AcademicsIllustration";
import AcademicsTimeline from "./AcademicsTimeline";

export default function AcademicsSection() {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-[8%] h-[280px] w-[280px] rounded-full bg-accent-orange/8 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] bottom-[10%] h-[240px] w-[240px] rounded-full bg-accent-blue/10 blur-[70px]"
      />

      <div className="relative">
        <div
          // ref={bubbleRef}
          className="absolute z-10 mx-auto max-w-[280px] -rotate-2 rounded-2xl border border-glass-border bg-glass px-4 py-3 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:max-w-[300px] lg:absolute right-[30%] lg:right-[20%] top-[-100px] lg:top-[-30px] lg:max-w-[260px]"
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
        </div>
      </div>

      <div className="relative grid items-start gap-12 lg:grid-cols-[1fr_min(420px,38%)] lg:items-center lg:gap-10 xl:gap-14">
        <AcademicsTimeline />
        <AcademicsIllustration />
      </div>
    </div>
  );
}
