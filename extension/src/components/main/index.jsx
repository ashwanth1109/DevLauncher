import React, { useState } from "react";

import TopBar from "../top-bar";
import Logout from "../logout";

const Main = ({ user, handleLogOut, children, topbarProps }) => {
  return (
    <div className="col flex1">
      <TopBar {...topbarProps} />
      <div className="flex1" style={{ padding: "8px", overflowY: "auto" }}>
        <div>User is logged in as: {user}</div>
        {children}
      </div>
      <Logout handleLogOut={handleLogOut} />
    </div>
  );
};

export default Main;
