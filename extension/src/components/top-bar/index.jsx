import React from "react";
import "./style.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Info from "@material-ui/icons/Info";
import FolderSpecial from "@material-ui/icons/FolderSpecial";
import History from "@material-ui/icons/History";

const tabStyle = { maxWidth: "100px", minWidth: "initial" };

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
        <Tab style={tabStyle} icon={<CloudUpload />} />
        <Tab style={tabStyle} icon={<Info />} />
        <Tab style={tabStyle} icon={<History />} />
          <Tab style={tabStyle} icon={<FolderSpecial />} />
      </Tabs>
    </Paper>
  );
};

export default TopBar;
