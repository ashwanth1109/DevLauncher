import React from "react";
import Paper from "@material-ui/core/Paper";

import "./style.css";
import Input from "./input";
import ButtonLoading from "../shared/button-loading";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleAuth,
  loading,
}) => (
  <div>
    <Paper square>
      <h1 className="login-title">Login Page</h1>
    </Paper>
    <form className="login-form" onSubmit={handleAuth}>
      <Input
        label="Enter username"
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Enter password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <ButtonLoading type="submit" style={{ width: "100%" }} loading={loading}>
        Sign In
      </ButtonLoading>
    </form>
  </div>
);

export default Login;
