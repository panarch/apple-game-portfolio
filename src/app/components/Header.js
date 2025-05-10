import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Apple Game</h1>
      <nav>
        <Link href="/">About</Link>
        <Link href="/play">Play</Link>
        <Link href="/ranking">Ranking</Link>
      </nav>
    </header>
  );
}
