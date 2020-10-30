import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import settings from "./assets/settings.png";
import Settings from "./components/settings/settings.page";

const PAGE_NAME = {
  SETTINGS: "SETTINGS",
};

const App = () => {
  const [page, setPage] = useState(PAGE_NAME.SETTINGS);

  const renderPage = useCallback(() => {
    switch (page) {
      case PAGE_NAME.SETTINGS:
        return <Settings />;
      default:
        return null;
    }
  }, [page]);

  return (
    <div className="app">
      <div className={`top-bar `}>
        <div
          className={`top-bar-icon ${
            page === PAGE_NAME.SETTINGS ? "highlight-bg" : ""
          }`}
        >
          <img src={settings} />
        </div>
      </div>
      <div className="flex1">{renderPage()}</div>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
