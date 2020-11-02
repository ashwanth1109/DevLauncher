import React from "react";
import Button from "@material-ui/core/Button";

const Logout = ({ handleLogOut }) => (
  <div style={{ padding: "8px" }}>
    <Button
      onClick={handleLogOut}
      variant="contained"
      color="primary"
      style={{ width: "100%" }}
    >
      Log Out
    </Button>
  </div>
);

export default Logout;
