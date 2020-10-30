import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import settings from "./assets/settings.png";
import upload from "./assets/upload.png";

import Settings from "./components/settings/settings.page";
import MenuIcon from "./components/menu-icon/menu-icon.component";
import Deploy from "./components/deploy/deploy.page";

const PAGE_NAME = {
  SETTINGS: "SETTINGS",
  DEPLOY: "DEPLOY",
};

const App = () => {
  const [page, setPage] = useState(PAGE_NAME.SETTINGS);

  const renderPage = useCallback(() => {
    switch (page) {
      case PAGE_NAME.SETTINGS:
        return <Settings />;
      case PAGE_NAME.DEPLOY:
        return <Deploy />;
      default:
        return null;
    }
  }, [page]);

  const openSettings = useCallback(() => {
    window.open("https://trilogy.devspaces.com/settings/");
  }, []);

  return (
    <div className="app">
      <div className={`top-bar row `}>
        <MenuIcon icon={settings} handleClick={openSettings} />
        <MenuIcon icon={upload} handleClick={() => setPage(PAGE_NAME.DEPLOY)} />
      </div>
      <div className="flex1">{renderPage()}</div>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
