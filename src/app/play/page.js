"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Play() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  function start() {
    if (!playing) {
      ref.current.start();
    } else {
      ref.current.stop();
    }

    setPlaying((v) => !v);
  }

  function gameover() {
    setPlaying(false);
  }

  useEffect(() => {
    ref.current.addEventListener("gameover", gameover);
  }, []);

  return (
    <main className={styles.page}>
      <button className={styles.start} onClick={start}>
        {playing ? "Reset" : "Start"}
      </button>
      <apple-game-board ref={ref} />
    </main>
  );
}
