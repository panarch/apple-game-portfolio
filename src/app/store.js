"use client";

import { createContext, useContext, useEffect, useState } from "react";

const RankingContext = createContext(null);

export function RankingProvider({ children }) {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    const rawRanks = localStorage.getItem("ranks");
    const initialRanks = rawRanks ? JSON.parse(rawRanks) : [];
    setRanks(initialRanks);
  }, []);

  useEffect(() => {
    localStorage.setItem("ranks", JSON.stringify(ranks));
  }, [ranks]);

  function addRecord(record) {
    setRanks((prev) =>
      [record, ...prev]
        .sort((a, b) => {
          const ds = b.score - a.score;
          if (ds !== 0) return ds;

          return new Date(a.date) - new Date(b.date);
        })
        .slice(0, 10),
    );
  }

  return (
    <RankingContext.Provider value={{ ranks, addRecord }}>
      {children}
    </RankingContext.Provider>
  );
}

export const useRanking = () => useContext(RankingContext);
