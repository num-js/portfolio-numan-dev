"use client";

type ScrollIndicatorProps = {
  targetId: string;
};

export default function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  function handleClick() {
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className="absolute bottom-[clamp(5.5rem,13vh,8rem)] left-1/2 z-[6] flex -translate-x-1/2 cursor-pointer flex-col items-center gap-[0.65rem] border-none bg-transparent text-white/75 transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-white"
      onClick={handleClick}
      aria-label="Scroll to next section"
    >
      <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em]">
        Scroll
      </span>
      <span
        className="relative h-[2.1rem] sm:h-[2.6rem] w-px overflow-hidden rounded-[1px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.35))]"
        aria-hidden="true"
      >
        <span className="absolute left-0 top-[-40%] h-[40%] w-full animate-travel-line bg-[linear-gradient(to_bottom,rgba(255,159,92,0),var(--color-accent-orange-soft),rgba(255,159,92,0))]" />
      </span>
    </button>
  );
}
