import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import Paper from "@material-ui/core/Paper";

import settings from "./assets/settings.png";
import upload from "./assets/upload.png";

import Settings from "./components/settings/settings.page";
import MenuIcon from "./components/menu-icon/menu-icon.component";
import Deploy from "./components/deploy/deploy.page";
import Auth from "./components/auth/auth.page";
import TopBar from "./components/top-bar";
import Login from "./components/login";
import useAuth from "./hooks/use-auth";
import Main from "./components/main";
import useDeploySettings from "./hooks/use-deploy-settings";

const PAGE_NAME = {
  AUTH: "AUTH",
  SETTINGS: "SETTINGS",
  DEPLOY: "DEPLOY",
};

const App = ({ url }) => {
  const [page, setPage] = useState(0);
  // const [tab, setTab] = useState(0);
  const { user, handleLogOut, loginProps } = useAuth();
  const deployProps = useDeploySettings(url);

  const renderPage = () => {
    switch (page) {
      case 0:
        return <Deploy {...deployProps} />;
      case PAGE_NAME.SETTINGS:
        return <Settings />;
      case PAGE_NAME.AUTH:
        return <Auth />;
      default:
        return null;
    }
  };

  const openSettings = useCallback(() => {
    window.open("https://trilogy.devspaces.com/settings/");
  }, []);

  return (
    <Paper className="app">
      {user ? (
        <Main user={user} handleLogOut={handleLogOut}>
          {renderPage()}
        </Main>
      ) : (
        <Login {...loginProps} />
      )}
    </Paper>
  );

  // return (
  //   <Paper className="app">
  //     <TopBar page={page} onPageChange={(_, val) => setPage(val)} />
  //   </Paper>
  //   // <div className="app">
  //   //   {/*<div className={`top-bar row `}>*/}
  //   //   {/*  <MenuIcon icon={settings} handleClick={openSettings} />*/}
  //   //   {/*  <MenuIcon icon={upload} handleClick={() => setPage(PAGE_NAME.DEPLOY)} />*/}
  //   //   {/*</div>*/}
  //   //   <div className="flex1">{renderPage()}</div>
  //   // </div>
  // );
};

const root = document.getElementById("root");

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   const tab = tabs[0];
//
//   ReactDOM.render(<App url={tab.url} />, root);
// });

// Temporary setup for enabling hmr via webapp (on localhost)

ReactDOM.render(
  <App url="https://github.com/trilogy-group/5k-response-tek/tree/gitpod-test" />,
  root
);
