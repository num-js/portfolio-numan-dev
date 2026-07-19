"use client";

import styles from "./PlaybackControls.module.css";

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
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.glassButton}
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" />
          </svg>
        )}
      </button>

      <button
        type="button"
        className={styles.glassButton}
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
