"use client";

import { compressToEncodedURIComponent } from "lz-string";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const RankingContext = createContext(null);

const VERSION = "6";

export function RankingProvider({ children }) {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    const version = localStorage.getItem("version");
    if (version !== VERSION) {
      localStorage.clear();
      localStorage.setItem("version", VERSION);
    }

    const rawRanks = localStorage.getItem("ranks");
    const initialRanks = rawRanks ? JSON.parse(rawRanks) : [];
    setRanks(initialRanks);
  }, []);

  useEffect(() => {
    localStorage.setItem("ranks", JSON.stringify(ranks));
  }, [ranks]);

  const addRecord = useCallback((record) => {
    record.dragCount = record.replay.logs.filter((log) => !log.refresh).length;
    record.replay = compressToEncodedURIComponent(
      JSON.stringify(record.replay),
    );

    setRanks((prev) =>
      [record, ...prev]
        .sort((a, b) => {
          const ds = b.score - a.score;
          if (ds !== 0) return ds;

          const dd = a.dragCount - b.dragCount;
          if (dd !== 0) return dd;

          return new Date(a.date) - new Date(b.date);
        })
        .slice(0, 10),
    );
  }, []);

  return (
    <RankingContext.Provider value={{ ranks, addRecord }}>
      {children}
    </RankingContext.Provider>
  );
}

export const useRanking = () => useContext(RankingContext);
