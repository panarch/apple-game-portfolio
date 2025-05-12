"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { useRanking } from "../store";

export default function Play() {
  const { addRecord } = useRanking();
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

  const gameover = useCallback(
    (e) => {
      addRecord(e.detail);
      setPlaying(false);

      setTimeout(() => {
        console.log("start replay :D");

        ref.current.replay(e.detail.replay);
      }, 2000);
    },
    [addRecord],
  );

  useEffect(() => {
    ref.current.addEventListener("gameover", gameover);
  }, [gameover]);

  return (
    <main className={styles.page}>
      <button className={styles.start} onClick={start}>
        {playing ? "Reset" : "Start"}
      </button>
      <apple-game-board ref={ref} />
    </main>
  );
}
