"use client";

import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [navHidden, setNavHidden] = useState(true);

  function toggle() {
    setNavHidden((v) => !v);
  }

  function hide() {
    setNavHidden(true);
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.title}>
        Apple Game
      </Link>

      <nav className={navHidden ? styles.hidden : ""}>
        <Link href="/" onClick={hide}>
          About
        </Link>
        <Link href="/play" onClick={hide}>
          Play
        </Link>
        <Link href="/ranking" onClick={hide}>
          Ranking
        </Link>
      </nav>
      <button className={styles.menu} onClick={toggle}>
        <Image src="/menu.png" width={30} height={30} alt="menu" />
      </button>
    </header>
  );
}
