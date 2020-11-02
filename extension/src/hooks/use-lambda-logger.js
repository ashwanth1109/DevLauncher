import { useEffect, useState } from "react";
import { CloudWatchLogs, CognitoIdentityCredentials, config } from "aws-sdk";
import {
  identityPoolId,
  lambdaLogGroupPrefix,
  region,
  userPoolLoginKey,
} from "../utils/data";
import getLogDisplayString from "../utils/get-log-display-string";

const useLambdaLogger = ({ envList, env, cognitoUser }) => {
  const [logGroups, setLogGroups] = useState([]);
  const [logGroupName, setLogGroupName] = useState("");
  const [cwInstance, setCwInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLambdaSelectChange = (e) => {
    setLogGroupName(e.target.value);
  };

  const createSession = (result) => {
    const jwtToken = result.getIdToken().getJwtToken();
    config.credentials = new CognitoIdentityCredentials(
      {
        IdentityPoolId: identityPoolId,
        Logins: { [userPoolLoginKey]: jwtToken },
      },
      { region }
    );

    config.credentials.get((err) => {
      if (err) return console.error(err);

      const { sessionToken } = config.credentials;

      fetchLambdaLogGroups(sessionToken);
    });
  };

  const fetchLambdaLogGroups = (sessionToken) => {
    const instance = new CloudWatchLogs({ sessionToken, region });
    setCwInstance(instance);

    instance.describeLogGroups(
      {
        logGroupNamePrefix: `${lambdaLogGroupPrefix}${envList[env]}`,
      },
      (err, { logGroups }) => {
        if (err) return console.error(err);

        console.log(logGroups);
        setLogGroups(logGroups);
      }
    );
  };

  // Create cognito session if it doesnt exist and fetch lambda log groups
  useEffect(() => {
    if (!cognitoUser) {
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (!session) {
        return;
      }

      createSession(session);
    });
  }, [cognitoUser]);

  const fetchLambdaLogs = () => {
    console.log(cwInstance);
    if (!cwInstance || !logGroupName) {
      return;
    }

    setLoading(true);

    cwInstance.describeLogStreams(
      {
        logGroupName,
        limit: 1,
        descending: true,
        orderBy: "LastEventTime",
      },
      (err, { logStreams }) => {
        if (err) {
          console.error(err, err.stack);
          return;
        }

        console.log("LOG STREAMS", logStreams);

        // We are only interested in the latest log stream in most cases
        const { logStreamName } = logStreams[0];

        cwInstance.getLogEvents(
          { logGroupName, logStreamName },
          (err, eventsResponse) => {
            if (err) {
              console.error(err, err.stack);
              return;
            }

            setLoading(false);

            const newWindow = window.open();
            newWindow.document.write(
              getLogDisplayString(logGroupName, eventsResponse)
            );
            newWindow.document.close();
          }
        );
      }
    );
  };

  return {
    logGroups,
    logGroupName,
    handleLambdaSelectChange,
    fetchLambdaLogs,
    envName: envList[env],
    loading,
  };
};

export default useLambdaLogger;
