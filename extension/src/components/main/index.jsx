import React, { useState } from "react";

import TopBar from "../top-bar";
import Logout from "../logout";

const Main = ({ user, handleLogOut, children }) => {
  const [tab, setTab] = useState(0);

  return (
    <div className="col flex1">
      <TopBar tab={tab} onTabChange={(_, val) => setTab(val)} />
      <div className="flex1" style={{ padding: "8px" }}>
        <div>User is logged in as: {user}</div>
        {children}
      </div>
      <Logout handleLogOut={handleLogOut} />
    </div>
  );
};

export default Main;
