import React from "react";
import ReactDOM from "react-dom";
import Paper from "@material-ui/core/Paper";

import Deploy from "./components/deploy/deploy.page";
import Login from "./components/login";
import useAuth from "./hooks/use-auth";
import Main from "./components/main";
import useDeploySettings from "./hooks/use-deploy-settings";
import useTopBar from "./hooks/use-top-bar";
import InfoTracker from "./components/info-tracker";
import useDeployInfo from "./hooks/use-deploy-info";
import useLambdaLogger from "./hooks/use-lambda-logger";
import FleetingLogger from "./components/fleeting-logger";
import HistoryTracker from "./components/history-tracker";
import useDeployHistory from "./hooks/use-deploy-history";

const App = ({ url, hash }) => {
  const { user, handleLogOut, cognitoUser, loginProps } = useAuth();
  const { addItemToHistory, history } = useDeployHistory();
  const deployProps = useDeploySettings({ url, hash, addItemToHistory });
  const infoTrackerProps = useDeployInfo();
  const { tab, onTabChange } = useTopBar();
  const { env, envList } = deployProps.chooseEnvProps;
  const fleetingLoggerProps = useLambdaLogger({ env, envList, cognitoUser });
  const envName = envList[env];

  const openSettings = () => {
    window.open("https://trilogy.devspaces.com/settings/");
  };

  const openWorkspaces = () => {
    window.open("https://trilogy.devspaces.com/");
  };

  const renderPage = () => {
    switch (tab) {
      case 0:
        return <Deploy {...deployProps} />;
      case 1:
        return (
          <InfoTracker
            {...infoTrackerProps}
            openSettings={openSettings}
            openWorkspaces={openWorkspaces}
          />
        );
      case 2:
        return (
          <HistoryTracker hash={hash} envName={envName} history={history} />
        );
      case 3:
        return <FleetingLogger {...fleetingLoggerProps} />;
      default:
        return null;
    }
  };

  return (
    <Paper className="app">
      {user ? (
        <Main
          user={user}
          handleLogOut={handleLogOut}
          topbarProps={{ tab, onTabChange }}
        >
          {renderPage()}
        </Main>
      ) : (
        <Login {...loginProps} />
      )}
    </Paper>
  );
};

const root = document.getElementById("root");

// Actual setup for chrome extension

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];

  chrome.storage.local.get(["hash"], ({ hash }) => {
    ReactDOM.render(<App url={tab.url} hash={hash} />, root);
  });
});

// Temporary setup for enabling hmr via webapp (on localhost for fast development)

// ReactDOM.render(
//   <App
//     // Test values supplied since we are not fetching it from background.js
//     url="https://github.com/trilogy-group/5k-response-tek/tree/gitpod-test"
//     hash="bd17f11"
//   />,
//   root
// );
