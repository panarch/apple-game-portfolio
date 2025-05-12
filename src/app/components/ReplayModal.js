"use client";

import { useEffect, useRef } from "react";
import styles from "./replaymodal.module.css";
import { decompressFromEncodedURIComponent } from "lz-string";

export default function ReplayModal({ replayData, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!replayData) return;

    const data = JSON.parse(decompressFromEncodedURIComponent(replayData));
    const timerId = setTimeout(() => {
      ref.current.replay(data);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [replayData]);

  async function share() {
    const url = `${window.location.origin}/?replay=${replayData}`;

    await navigator.clipboard.writeText(url);
    window.alert("Replay link copied to clipboard! ✅");
  }

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h1 className={styles.title}>Replay</h1>
        <button className={styles.share} onClick={share}>
          Share
        </button>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
        <apple-game-board ref={ref} className={styles.board} />
      </div>
    </div>
  );
}
