"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import ReplayModal from "../components/ReplayModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { decompressFromEncodedURIComponent } from "lz-string";

const DEMO_REPLAY =
  "N4IgNg9g5gziBcBtUAHCMCMDEYDQFYBdXENGAJmzwBZiQAXASwFsBTBcjfATgF9dU6LEjzk6ZSiNwA2OkzYIAzN2kAOfoMzYADLgzj0kxLrEl57ePkUZyG0kJ17tBilSdyWF7towB2O2TCiIq4qi5G+KEeCvA2qvjUAQ5Ikdzh2NK4aWaeCBiKqt5JWkiZYSQS2L5ROTFcior+AvYliJm+6UjVHbUWXL6qisVB1DKdiJGyvXnS3Ir4wxm4tBWGS0TTsaravonNgdiRiuORKwy5sdzUqk2aQbrHq65Ius6b5L7k0rb7yTh6410G3OMXIqmo+AWv1amTeLQiuDh5iUPnIfGhQRCcMqUiRF2s8SGGOwo0e8JJAM2imoNj2d2w5DGTyMjJ6IIs81UGDpLUxy3GjLOyPgNPmUNAACdWAAzKUwAAWCHoEoArqxNtRpFxxbzHNlyVJ9cLqJ98oskCF9TjEKMjRd8NpFJxzYhGeUDa73Jt8NzyD96VIzta8MDhVZtNp-bqpPpmW4yWGHTYXboph7dGyw74BkSA8EmR7RmnhdJtD7c9GJrg2db2tELFr8NJpC7Iu7azV2QhvtpVOpiaUCONMkKLtIEuRtC7MqYPZFZyWczyDl1cLPrdUE2ObrMXSEydbGVuYr58tIKyubWvxqMFxddpqMLw6AAjCAAQwlABMgpkQtVRjwVRqwILIQMAvQ1xA-9IOqRlGTKZYkO4JDqmAwUQOAvA4NAkcwJQkJbSQ+CZFIlDgOAmDqhQ7pQiglCEKQ9pIIY3AQkiI5QIA0jRmAyJsLI0CYOBN9Py-IwaJAlC2zYkCQzo4CZ3oyDREg04FOQzSQkoqDUjolC8HI3T9NIxiQlZUDgKMvBMmk2SQj-QSbKkqCcI42TDMgxi7MmSD0NQ69eCAA";

export default function Landing() {
  const ref = useRef(null);
  const params = useSearchParams();
  const [replayData, setReplayData] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const data = JSON.parse(decompressFromEncodedURIComponent(DEMO_REPLAY));

      ref.current.replay(data);
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const data = params.get("replay");
    if (!data) return;

    setReplayData(data);
  }, [params]);

  return (
    <>
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
          <apple-game-board ref={ref} />
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
          <h3>
            Once installed, Apple Game opens full-screen and works offline.
          </h3>
        </section>
      </main>
      {replayData && (
        <ReplayModal
          replayData={replayData}
          onClose={() => setReplayData(null)}
        />
      )}
    </>
  );
}
