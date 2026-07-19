"use client";

import styles from "./SoundHint.module.css";

type SoundHintProps = {
  visible: boolean;
  onClick: () => void;
};

export default function SoundHint({ visible, onClick }: SoundHintProps) {
  return (
    <button
      type="button"
      className={styles.hint}
      data-visible={visible}
      onClick={onClick}
      aria-label="Tap to unmute video"
      tabIndex={visible ? 0 : -1}
    >
      <span className={styles.pulseDot} aria-hidden="true" />
      <span className={styles.label}>Tap for sound</span>
    </button>
  );
}
