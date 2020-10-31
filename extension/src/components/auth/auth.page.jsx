import React, { useEffect, useState } from "react";
import { CloudWatchLogs, CognitoIdentityCredentials, config } from "aws-sdk";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from "amazon-cognito-identity-js";

import StyledTextField from "../shared/text-field.component";
import Button from "@material-ui/core/Button";

const poolData = {
  UserPoolId: "us-east-1_Ker0E3FWJ",
  ClientId: "2g10imn2ed0gqv0jetbdpda8og",
};

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [showFetchButton, setShowFetchButton] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [cognitoUser, setCognitoUser] = useState(null);

  const createCredentialsObject = (result) => {
    return new CognitoIdentityCredentials(
      {
        IdentityPoolId: "us-east-1:6acdade6-3c69-4a58-84df-55fa2c691ae8",
        Logins: {
          "cognito-idp.us-east-1.amazonaws.com/us-east-1_Ker0E3FWJ": result
            .getIdToken()
            .getJwtToken(),
        },
      },
      {
        region: "us-east-1",
      }
    );
  };

  useEffect(() => {
    const userPool = new CognitoUserPool(poolData);

    const cognitoUser = userPool.getCurrentUser();
    console.log("EFFECT TRIGGERED", cognitoUser);
    setCognitoUser(cognitoUser);

    if (cognitoUser !== null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Session validity:", session.isValid());
        setUser(session.getAccessToken().decodePayload().username);

        cognitoUser.getUserAttributes((err, attributes) => {
          console.log("error", err);
          console.log("attributes", attributes);
        });
      });
    }

    setCheckingAuth(false);
  }, []);

  // useEffect(() => {
  //   let token = localStorage.getItem("accessToken");
  //   let cgUser = localStorage.getItem("cognitoUser");
  //
  //   if (token && cgUser) {
  //     token = JSON.parse(token);
  //     console.log(token);
  //     setAccessToken(token);
  //     const payload = token.payload;
  //     setUser(payload.username);
  //     setShowFetchButton(true);
  //     setCognitoUser(JSON.parse(cgUser));
  //   }
  //
  //   setCheckingAuth(false);
  // }, []);

  const authenticateUser = () => {
    console.log("Test", username, password);
    const authData = {
      Username: username,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authData);

    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (session) {
        console.log("Success", session);
        // const idToken = result.getIdToken();
        setUser(session.getAccessToken().decodePayload().username);
        // setAccessToken(accessPayload);
        // localStorage.setItem(
        //   "accessToken",
        //   JSON.stringify(accessToken.getJwtToken())
        // );
        // localStorage.setItem("idToken", JSON.stringify(idToken.getJwtToken()));

        // const user = ;
        // console.log("COGNITP USER", user);
        setCognitoUser(userPool.getCurrentUser());

        // setCognitoUser(cognitoUser);
        // localStorage.setItem("cognitoUser", JSON.stringify(cognitoUser));
      },
      onFailure: function (err) {
        console.log("Error", err);
      },
    });
  };

  const fetchLambdaLogs = () => {
    if (!cognitoUser) {
      return;
    }

    cognitoUser.getSession((err, session) => {
      if (session) {
        console.log("You are logged in", session);

        config.credentials = createCredentialsObject(session);

        config.credentials.get((err) => {
          if (err) {
            console.log(err);
            return;
          }

          const { sessionToken } = config.credentials;

          const cwLogs = new CloudWatchLogs({
            sessionToken,
            region: "us-east-1",
          });

          cwLogs.describeLogGroups(
            {
              logGroupNamePrefix: "/aws/lambda/responsetek_ash1",
            },
            (err, data) => {
              if (err) {
                console.log(err, err.stack);
                return;
              }

              console.log(data);

              const logGroup = data.logGroups[0];
              const { logGroupName } = logGroup;

              cwLogs.describeLogStreams(
                {
                  logGroupName,
                  limit: 1,
                  descending: true,
                  orderBy: "LastEventTime",
                },
                (err, { logStreams }) => {
                  if (err) {
                    console.log(err, err.stack);
                    return;
                  }

                  const { logStreamName } = logStreams[0];

                  cwLogs.getLogEvents(
                    {
                      logGroupName,
                      logStreamName,
                    },
                    (err, eventsResponse) => {
                      if (err) {
                        console.log(err, err.stack);
                        return;
                      }

                      console.log("eventsResponse:::", eventsResponse);
                      const newWindow = window.open();
                      newWindow.document.write(JSON.stringify(eventsResponse));
                    }
                  );
                }
              );
            }
          );
        });
      }
    });
  };

  if (checkingAuth) {
    return <div>Checking for auth. . . </div>;
  }

  return (
    <div className={`col a-center`}>
      {cognitoUser ? (
        <div>User is signed in as {user}</div>
      ) : (
        <>
          <StyledTextField
            label={`Username`}
            handleChange={handleUsernameChange}
          />
          <StyledTextField
            label={`Password`}
            handleChange={handlePasswordChange}
            type={`password`}
          />

          <Button
            variant={`contained`}
            color={`primary`}
            size={`small`}
            onClick={authenticateUser}
          >
            Login
          </Button>
        </>
      )}

      <div className={`mb-4`} />

      {cognitoUser && (
        <Button
          variant={`contained`}
          color={`primary`}
          size={`small`}
          onClick={fetchLambdaLogs}
        >
          Fetch Lambda logs
        </Button>
      )}
    </div>
  );
};

export default Auth;
