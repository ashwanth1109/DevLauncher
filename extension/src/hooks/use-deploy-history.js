import { useEffect, useState } from "react";

class HistoryItem {
  constructor(date, hash, runOptions) {
    this.date = date;
    this.hash = hash;
    this.runOptions = runOptions;
  }
}

const useDeployHistory = () => {
  const [history, setHistory] = useState({});

  useEffect(() => {
    const historyStringified = localStorage.getItem("history");
    const fetchedHistory = historyStringified
      ? JSON.parse(historyStringified)
      : [];
    setHistory(fetchedHistory);
  }, []);

  const addItemToHistory = (envName, date, hash, runOptions) => {
    // We only want to save the 5 latest events
    const historyofCurrentEnv = history[envName] || [];
    if (historyofCurrentEnv.length > 5) {
      historyofCurrentEnv.pop();
    }

    historyofCurrentEnv.unshift(new HistoryItem(date, hash, runOptions));
    setHistory({ ...history, [envName]: historyofCurrentEnv });

    localStorage.setItem("history", JSON.stringify(history));
  };

  return { history, addItemToHistory };
};

export default useDeployHistory;
