"use client";

import styles from "./ScrollIndicator.module.css";

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
      className={styles.indicator}
      onClick={handleClick}
      aria-label="Scroll to next section"
    >
      <span className={styles.label}>Scroll</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.pulse} />
      </span>
    </button>
  );
}
