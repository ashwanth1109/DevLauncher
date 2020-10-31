import TextField from "@material-ui/core/TextField";
import React from "react";

const StyledTextField = ({ label, handleChange, type }) => {
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
        onChange={handleChange}
        type={type || "text"}
      />
    </>
  );
};

export default StyledTextField;
