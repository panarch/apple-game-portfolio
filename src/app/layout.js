import { Galindo } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const galindo = Galindo({
  variable: "--font-galindo",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="/game.js" defer type="module"></script>
      </head>
      <body className={galindo.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
