import { useLayoutEffect, useState } from "react";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

// TODO: Identify if it is safe to store this information as is
const poolData = {
  UserPoolId: "us-east-1_Ker0E3FWJ",
  ClientId: "2g10imn2ed0gqv0jetbdpda8og",
};

const useAuth = () => {
  // Cognito artifacts
  const [cognitoUser, setCognitoUser] = useState(null);

  // Login form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // User name state
  const [user, setUser] = useState("");

  // Check if user is already logged in
  useLayoutEffect(() => {
    const userPool = new CognitoUserPool(poolData);
    setCognitoUser(userPool.getCurrentUser());
  }, []);

  useLayoutEffect(() => {
    if (!cognitoUser) return;

    // If user is logged in, load into state
    cognitoUser.getSession((err, session) => {
      if (err) return console.error(err);

      setUser(session.getAccessToken().decodePayload().username);
    });
  }, [cognitoUser]);

  const handleAuth = (e) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userPool = new CognitoUserPool({
      UserPoolId: "us-east-1_Ker0E3FWJ",
      ClientId: "2g10imn2ed0gqv0jetbdpda8og",
    });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        setUser(session.getAccessToken().decodePayload().username);
      },
    });
  };

  return {
    user,
    loginProps: { username, password, setUsername, setPassword, handleAuth },
  };
};

export default useAuth;
