"use client";
import { useRanking } from "../store";
import styles from "./page.module.css";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short", // Jan, Feb, …
  day: "numeric", // 5
  year: "numeric", // 2025
});

export default function Randking() {
  const { ranks } = useRanking();

  return (
    <main className={styles.page}>
      <h1>Ranking</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Score</th>
            <th>Drags</th>
            <th>Date</th>
            <th>Replay</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map(({ score, dragCount, date }, i) => (
            <tr key={`rank-${i}`}>
              <td>{i + 1}</td>
              <td>{score}</td>
              <td>{dragCount}</td>
              <td>{dateFmt.format(new Date(date))}</td>
              <td>
                <button>Show</button>
              </td>
            </tr>
          ))}
          {Array(10 - ranks.length)
            .fill(null)
            .map((_, i) => (
              <tr key={`dummy-${i}`}>
                <td>{i + ranks.length + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
