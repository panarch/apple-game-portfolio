import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">About</Link>
      <Link href="/play">Play</Link>
      <Link href="/ranking">Ranking</Link>
    </header>
  );
}
