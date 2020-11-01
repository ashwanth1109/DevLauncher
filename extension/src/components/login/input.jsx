import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = ({ label, handleChange, type }) => (
  <TextField
    variant="outlined"
    label={label}
    onChange={handleChange}
    type={type || "text"}
    style={{ marginBottom: "16px", width: "100%" }}
  />
);

export default Input;
