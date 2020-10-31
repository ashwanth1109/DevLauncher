import React from "react";
import "./settings.css";
import StyledTextField from "../shared/text-field.component";

const Settings = () => {
  return (
    <div className={`col a-center`}>
      <StyledTextField label="AWS Access Key" />
      <StyledTextField label="AWS Secret Key" />
      <StyledTextField label="AWS Env Name" />
    </div>
  );
};

export default Settings;
