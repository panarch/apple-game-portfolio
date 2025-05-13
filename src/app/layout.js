import { Galindo } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";
import { RankingProvider } from "./store";
import OrientationGuide from "./components/OrientationGuide";
import { Suspense } from "react";

const galindo = Galindo({
  variable: "--font-galindo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <script src="/game.js" defer type="module"></script>
      </head>
      <body className={galindo.variable}>
        <Header />
        <Suspense>
          <RankingProvider>{children}</RankingProvider>
        </Suspense>
        <OrientationGuide />
      </body>
    </html>
  );
}
