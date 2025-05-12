"use client";

import { useEffect, useRef } from "react";
import styles from "./replaymodal.module.css";

export default function ReplayModal({ replayData, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!replayData) return;

    const timerId = setTimeout(() => {
      ref.current.replay(replayData);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [replayData]);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h1 className={styles.title}>Replay</h1>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
        <apple-game-board ref={ref} className={styles.board} />
      </div>
    </div>
  );
}
