"use client";

type SoundHintProps = {
  visible: boolean;
  onClick: () => void;
};

export default function SoundHint({ visible, onClick }: SoundHintProps) {
  return (
    <button
      type="button"
      className="absolute right-[clamp(1.25rem,4vw,3rem)] bottom-[calc(clamp(1.25rem,4vw,3rem)+3.6rem)] sm:bottom-[calc(clamp(1.25rem,4vw,3rem)+4.25rem)] z-[6] inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-[0.8rem] sm:px-[0.95rem] py-[0.45rem] sm:py-[0.55rem] text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.06em] text-white/90 backdrop-blur-md backdrop-saturate-150 opacity-0 scale-[0.96] translate-y-1.5 pointer-events-none transition-[opacity,transform] duration-500 ease-cinematic hover:border-accent-orange-soft/50 data-[visible=true]:pointer-events-auto data-[visible=true]:translate-y-0 data-[visible=true]:scale-100 data-[visible=true]:opacity-100 data-[visible=true]:animate-float-hint"
      data-visible={visible}
      onClick={onClick}
      aria-label="Tap to unmute video"
      tabIndex={visible ? 0 : -1}
    >
      <span
        className="h-2 w-2 flex-shrink-0 rounded-full bg-accent-orange animate-pulse-dot"
        aria-hidden="true"
      />
      <span>Tap for sound</span>
    </button>
  );
}
