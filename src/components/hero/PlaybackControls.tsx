"use client";

const glassButtonClass =
  "grid h-[2.65rem] w-[2.65rem] sm:h-12 sm:w-12 cursor-pointer place-items-center rounded-full border border-glass-border bg-glass text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ease-cinematic hover:-translate-y-0.5 hover:scale-105 hover:border-accent-orange-soft/45 hover:bg-white/10 hover:shadow-[0_8px_28px_rgba(255,122,60,0.25)] active:translate-y-0 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft";

type PlaybackControlsProps = {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
};

export default function PlaybackControls({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: PlaybackControlsProps) {
  return (
    <div className="absolute right-[clamp(1.25rem,4vw,3rem)] bottom-[clamp(1.25rem,4vw,3rem)] z-[6] flex gap-3">
      <button
        type="button"
        className={glassButtonClass}
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[1.1rem] w-[1.1rem]">
            <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[1.1rem] w-[1.1rem]">
            <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" />
          </svg>
        )}
      </button>

      <button
        type="button"
        className={glassButtonClass}
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[1.1rem] w-[1.1rem]">
            <path
              d="M4 9v6h4l5 5V4L8 9H4z"
              fill="currentColor"
            />
            <path
              d="M16.5 8.5l5 7M21.5 8.5l-5 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[1.1rem] w-[1.1rem]">
            <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            <path
              d="M16 8.5a5 5 0 010 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M18.5 6a8.5 8.5 0 010 12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
