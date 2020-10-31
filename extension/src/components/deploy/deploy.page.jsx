import React, { useCallback, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const envList = ["ash1", "ash2"];
const options = ["install", "deploy", "start", "clean", "seed", "destroy"];

const Deploy = ({ url }) => {
  const [env, setEnv] = useState("ash1");
  const [envMap, setEnvMap] = useState({});

  const [checkboxState, setCheckboxState] = useState(
    options.reduce((acc, val) => {
      acc[val] = false;

      return acc;
    }, {})
  );

  const handleCheckboxStateChange = (e) => {
    setCheckboxState({ ...checkboxState, [e.target.name]: e.target.checked });
  };

  const handleChange = useCallback((e) => {
    setEnv(e.target.value);
  }, []);

  const handleClick = () => {
    const { install, deploy, start, clean, seed, destroy } = checkboxState;
    const branch = url
      .replace("https://github.com/trilogy-group/", "")
      .split("/")[2];

    localStorage.setItem(env, branch);

    window.open(
      `https://trilogy.devspaces.com/#env=${env},install=${install},clean=${clean},deploy=${deploy},start=${start},seed=${seed},destroy=${destroy}/${url}`
    );
  };

  useEffect(() => {
    setEnvMap(
      envList.reduce((acc, val) => {
        acc[val] = localStorage.getItem(val);
        return acc;
      }, {})
    );
  }, []);

  return (
    <div className={"col"}>
      <div className={"mb-4"}>
        <FormControl component={"fieldset"}>
          <FormLabel component={"legend"}>Choose your env</FormLabel>

          <RadioGroup name={"env"} value={env} onChange={handleChange}>
            <div className={`row`}>
              {envList.map((envVal) => (
                <FormControlLabel
                  key={envVal}
                  control={<Radio />}
                  label={envVal}
                  value={envVal}
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <FormGroup row>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            option={option}
            control={<Checkbox checked={checkboxState[option]} />}
            onChange={handleCheckboxStateChange}
            name={option}
            color={"primary"}
            label={option}
          />
        ))}
      </FormGroup>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClick}
      >
        Launch
      </Button>

      <div className={`mb-4`} />

      <TableContainer component={Paper}>
        <Table className={``}>
          <TableHead>
            <TableRow>
              <TableCell>Env</TableCell>
              <TableCell align={`right`}>Branch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(envMap).map(([envName, branch]) => {
              console.log(envName, branch);
              return (
                <TableRow key={envName}>
                  <TableCell component={`th`} scope={`row`}>
                    {envName}
                  </TableCell>
                  <TableCell align={`right`}>{branch}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Deploy;
