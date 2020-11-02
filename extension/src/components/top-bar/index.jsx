import React from "react";
import "./style.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Info from "@material-ui/icons/Info";

const TopBar = ({ tab, onTabChange }) => {
  return (
    <Paper square className="top-bar">
      <Tabs
        value={tab}
        onChange={onTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<CloudUpload />} />
        <Tab icon={<Info />} />
      </Tabs>
    </Paper>
  );
};

export default TopBar;
