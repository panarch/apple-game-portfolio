import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Landing() {
  return (
    <main className={styles.page}>
      <section>
        <Image src="/logo.png" width={160} height={160} alt="Logo" />
        <h1>“Drag apples to make 10 before time runs out!”</h1>
        <Link href="/play" className={styles.play}>
          Play Now!
        </Link>
      </section>

      <section>
        <h2>Demo Replay</h2>
        <h3>“See it in action—watch a short demo.”</h3>
        <Image
          src="/demo.png"
          width={618}
          height={537}
          alt="Demo Replay (Mock)"
        />
      </section>

      <section>
        <h2>How to Play</h2>
        <ol>
          <li>Drag apples together.</li>
          <li>Hit exactly 10.</li>
          <li>Beat the clock.</li>
          <li>Use your one-time Refresh to reshuffle the board.</li>
        </ol>
      </section>

      <section>
        <h2>Install Apple Game as an app</h2>
        <ul>
          <li>Android — Tap Install at the bottom of the screen.</li>
          <li>iOS — Tap Share ▢↑ and select Add to Home Screen.</li>
        </ul>
        <h3>Once installed, Apple Game opens full-screen and works offline.</h3>
      </section>
    </main>
  );
}
