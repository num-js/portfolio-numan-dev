import VideoIntro from "@/components/hero/VideoIntro";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <VideoIntro />

      <section id="work" className={styles.nextSection}>
        <div className={styles.nextInner}>
          <p className={styles.nextTag}>Selected Work</p>
          <h2 className={styles.nextHeading}>
            Crafted with care, shipped with precision.
          </h2>
          <p className={styles.nextCopy}>
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
