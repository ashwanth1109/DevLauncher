import React from "react";
import "./style.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import CloudUpload from "@material-ui/icons/CloudUpload";

const TopBar = ({ page, onPageChange }) => {
  return (
    <Paper square className="top-bar">
      <Tabs
        value={page}
        onChange={onPageChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<CloudUpload />} />
        <Tab icon={<CloudUpload />} />
      </Tabs>
    </Paper>
  );
};

export default TopBar;
