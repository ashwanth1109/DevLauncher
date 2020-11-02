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

const App = ({ url }) => {
  const { user, handleLogOut, cognitoUser, loginProps } = useAuth();
  const deployProps = useDeploySettings(url);
  const infoTrackerProps = useDeployInfo();
  const { tab, onTabChange } = useTopBar();
  const { env, envList } = deployProps.chooseEnvProps;
  const fleetingLoggerProps = useLambdaLogger({ env, envList, cognitoUser });

  const renderPage = () => {
    switch (tab) {
      case 0:
        return <Deploy {...deployProps} />;
      case 1:
        return <InfoTracker {...infoTrackerProps} />;
      case 2:
        return <FleetingLogger {...fleetingLoggerProps} />;
      default:
        return null;
    }
  };

  const openSettings = () => {
    window.open("https://trilogy.devspaces.com/settings/");
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
