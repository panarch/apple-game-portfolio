"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import ReplayModal from "../components/ReplayModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { decompressFromEncodedURIComponent } from "lz-string";

const DEMO_REPLAY =
  "N4IgNg9g5gziBcBtUAHCMCMDEAYA0AbALp4howBM2GhJIALgJYC2ApghgCwCcArAL55U6LEhoAOOuSpIKeSaSZsEFcTgKDhmbHIDsU9DMRyMOOkvbxOGXRU1kROvJwOUnxRS0u8K3DPfJRYzwAZlcjENDzLwRxXm5xAMckSN5w7EiPBhj4bl1eHCTtFNpSaQznaOV4U10MfyEHYsROPDSyw2xWrIsODAIcAUbAiv0OtyRWsezqjAoMEKGtINaFJqNeeSrLOd5OROHkxF0t8YjTmZ3eGxCioJPp8qQT7m2OAc5OO+wTrKfjtpvGoEAjcbjfJAEQFnbBQno5G4EOyHZqbFww56VTyzcQETgaFFBKEUdKQvDTXo1Pj9CGITZmDF0qLYywUTi6Ti3QnYTZ-TqYkkslQgmy0qGmUmIcVAkI4bghcHcyZ4BnrWF4QWXBAhNnXWmtVX-aVC+AhTiDQpKxA0dpqsTkmUEcQ62k0MKMmjorWm7g4XQE5bYfBe-6tL2U81+rmB+2vD14CUm6wYZ32ABOrAAZhmYAALBD0NMAV1YSfmumjTSCeklcjWEfxIUrIxKa3+EiBjfEipjTLb-KZce97IKAarPIThoH4tVEfEuj4tN5ks2FJyPF9S3HypDA9atspBWdW5bLVKdrP9ZyPnEbNpkQwksi7u9e24TtdzIvchfh94-4aXsaCnCZglna8CF0Wwlw1Fcv0PPwcEtXsoV3UC0SBAYQlFK04UlYlMP6M19S-f4Tl-HIkTUHttwBW1-k2TVKTxa4vitVpH0ZSJw0o3gkTY3s5DQow5APSikV0A4gNgxk5CYyioJwZFe0iECjHwcDqlBOZlNokwn2hb1dBwfYBNo-BHgHGg12qWwQkg-g6AAIwgABDNMABMgnEQg8G4NpnFCAL9w1ALNh81ZQqhNFyT8hMgs9ILxQSoLMnkdLVwCn9YpoOEgu6XzooC59fNE0KaDKuTQpeVL4o4+LIhOcLYrrWLWiE+L-JoGh-M1Fz3I8owTmykqfMiOR-JixKfKhfyTki4bQv88bAp87KesC8jQtSXyThmoK5riqrWi6wKbV89rgsKhqWvSyJ-J8irAu49Kat+AK8qemLMrSfggA";

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

        <section>
          <h2>GitHub Repository</h2>
          <Link
            href="https://github.com/panarch/apple-game-portfolio"
            target="_blank"
          >
            https://github.com/panarch/apple-game-portfolio
          </Link>
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
