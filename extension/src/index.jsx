import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import settings from "./assets/settings.png";
import upload from "./assets/upload.png";

import Settings from "./components/settings/settings.page";
import MenuIcon from "./components/menu-icon/menu-icon.component";
import Deploy from "./components/deploy/deploy.page";
import Auth from "./components/auth/auth.page";

const PAGE_NAME = {
  AUTH: "AUTH",
  SETTINGS: "SETTINGS",
  DEPLOY: "DEPLOY",
};

const App = ({ tab }) => {
  const [page, setPage] = useState(PAGE_NAME.AUTH);

  const renderPage = useCallback(() => {
    switch (page) {
      case PAGE_NAME.SETTINGS:
        return <Settings />;
      case PAGE_NAME.DEPLOY:
        return <Deploy url={tab.url} />;
      case PAGE_NAME.AUTH:
        return <Auth />;
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

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   const tab = tabs[0];
//
//   ReactDOM.render(<App tab={tab} />, root);
// });

// Temporary setup for enabling hmr via webapp (on localhost)

ReactDOM.render(
  <App
    tab={{
      url: "https://github.com/trilogy-group/5k-response-tek/tree/gitpod-test",
    }}
  />,
  root
);
