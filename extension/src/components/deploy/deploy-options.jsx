import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

const DeployOptions = ({ options, setOptions }) => {
  const handleCheckboxStateChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };

  return (
    <FormGroup row>
      {Object.keys(options).map((option) => (
        <FormControlLabel
          key={option}
          option={option}
          control={<Checkbox checked={options[option]} />}
          onChange={handleCheckboxStateChange}
          name={option}
          color={"primary"}
          label={option}
        />
      ))}
    </FormGroup>
  );
};

export default DeployOptions;
