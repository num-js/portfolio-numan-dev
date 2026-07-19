import VideoIntro from "@/components/hero/VideoIntro";

export default function Home() {
  return (
    <main className="relative">
      <VideoIntro />

      <section
        id="work"
        className="relative z-[1] grid min-h-screen place-items-center rounded-t-[clamp(20px,3vw,40px)] bg-ink px-[clamp(1.5rem,6vw,6rem)] py-[clamp(4rem,12vh,7rem)] shadow-[0_-60px_120px_-40px_rgba(0,0,0,0.7)]"
      >
        <div className="max-w-[760px] text-center">
          <p className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-accent-orange-soft">
            Selected Work
          </p>
          <h2 className="mb-5 text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.01em] text-[#f5f2ec]">
            Crafted with care, shipped with precision.
          </h2>
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.7] text-mist/70">
            This is where your project showcase, case studies, or timeline
            would continue — the cinematic hero above stays pinned in place
            as this panel rises to reveal it, echoing the reveal you&apos;d
            find in a high-end film title sequence.
          </p>
        </div>
      </section>
    </main>
  );
}
