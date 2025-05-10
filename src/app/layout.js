import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">About</Link>
          <Link href="/play">Play</Link>
          <Link href="/ranking">Ranking</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
