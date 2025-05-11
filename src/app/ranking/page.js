import styles from "./page.module.css";

const RANKS = [
  { rank: 1, score: 100, drags: 53, date: new Date() },
  { rank: 2, score: 90, drags: 33, date: new Date() },
  { rank: 3, score: 83, drags: 43, date: new Date() },
  { rank: 4, score: 63, drags: 50, date: new Date() },
  { rank: 5, score: 50, drags: 51, date: new Date() },
  { rank: 6, score: 50, drags: 51, date: new Date() },
  { rank: 7, score: 50, drags: 51, date: new Date() },
  { rank: 8, score: 50, drags: 51, date: new Date() },
  { rank: 9, score: 50, drags: 51, date: new Date() },
  { rank: 10, score: 50, drags: 51, date: new Date() },
];

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short", // Jan, Feb, …
  day: "numeric", // 5
  year: "numeric", // 2025
});

export default function Randking() {
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
          {RANKS.map(({ rank, score, drags, date }) => (
            <tr key={rank}>
              <td>{rank}</td>
              <td>{score}</td>
              <td>{drags}</td>
              <td>{dateFmt.format(date)}</td>
              <td>
                <button>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
