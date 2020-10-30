import React from "react";
import "./settings.css";
import TextField from "@material-ui/core/TextField";

const StyledTextField = ({ label }) => {
  return (
    <>
      <div style={{ width: "100%", height: "16px" }} />
      <TextField
        label={label}
        variant="filled"
        className={`input`}
        InputProps={{
          style: {
            color: "#17387A",
            background: "#f4f5f7",
            fontSize: "1.2rem",
          },
        }}
        InputLabelProps={{
          style: {
            color: "#737581",
          },
        }}
      />
    </>
  );
};

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
