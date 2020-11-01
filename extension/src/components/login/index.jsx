import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "./style.css";
import Input from "./input";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleAuth,
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "100%" }}
      >
        Sign In
      </Button>
    </form>
  </div>
);

export default Login;
