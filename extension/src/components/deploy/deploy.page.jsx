import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import ChooseEnv from "./choose-env";
import DeployOptions from "./deploy-options";

const Deploy = ({ handleDeploy, chooseEnvProps, deployOptionsProps }) => {
  const [activeStep, setActiveStep] = useState(1);
  const { env, envList } = chooseEnvProps;

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Current env: {envList[env]}</StepLabel>
          <StepContent>
            <ChooseEnv {...chooseEnvProps} />
            <div style={{ marginTop: "8px" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(1)}
              >
                Next
              </Button>
            </div>
          </StepContent>
        </Step>

        <Step>
          <StepLabel>Set your deploy options</StepLabel>
          <StepContent>
            <DeployOptions {...deployOptionsProps} />
            <div style={{ marginTop: "8px" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(0)}
                style={{ marginRight: "8px" }}
              >
                Prev
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeploy}
              >
                Deploy
              </Button>
            </div>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

// const Deploy = ({ url }) => {
//   const [env, setEnv] = useState("ash1");
//   const [envMap, setEnvMap] = useState({});
//
//   const [checkboxState, setCheckboxState] = useState(
//     options.reduce((acc, val) => {
//       acc[val] = false;
//
//       return acc;
//     }, {})
//   );
//
//   const handleCheckboxStateChange = (e) => {
//     setCheckboxState({ ...checkboxState, [e.target.name]: e.target.checked });
//   };
//
//   const handleChange = useCallback((e) => {
//     setEnv(e.target.value);
//   }, []);
//
//   const handleClick = () => {
//     const { install, deploy, start, clean, seed, destroy } = checkboxState;
//     const branch = url
//       .replace("https://github.com/trilogy-group/", "")
//       .split("/")[2];
//
//     localStorage.setItem(env, branch);
//
//     window.open(
//       `https://trilogy.devspaces.com/#env=${env},install=${install},clean=${clean},deploy=${deploy},start=${start},seed=${seed},destroy=${destroy}/${url}`
//     );
//   };
//
//   useEffect(() => {
//     setEnvMap(
//       envList.reduce((acc, val) => {
//         acc[val] = localStorage.getItem(val);
//         return acc;
//       }, {})
//     );
//   }, []);
//
//   return (
//     <div className={"col"}>
//       <div className={"mb-4"}>
//         <FormControl component={"fieldset"}>
//           <FormLabel component={"legend"}>Choose your env</FormLabel>
//
//           <RadioGroup name={"env"} value={env} onChange={handleChange}>
//             <div className={`row`}>
//               {envList.map((envVal) => (
//                 <FormControlLabel
//                   key={envVal}
//                   control={<Radio />}
//                   label={envVal}
//                   value={envVal}
//                 />
//               ))}
//             </div>
//           </RadioGroup>
//         </FormControl>
//       </div>
//
//       <FormGroup row>
//         {options.map((option) => (
//           <FormControlLabel
//             key={option}
//             option={option}
//             control={<Checkbox checked={checkboxState[option]} />}
//             onChange={handleCheckboxStateChange}
//             name={option}
//             color={"primary"}
//             label={option}
//           />
//         ))}
//       </FormGroup>
//
//       <Button
//         variant="contained"
//         color="primary"
//         size="small"
//         onClick={handleClick}
//       >
//         Launch
//       </Button>
//
//       <div className={`mb-4`} />
//
//       <TableContainer component={Paper}>
//         <Table className={``}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Env</TableCell>
//               <TableCell align={`right`}>Branch</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(envMap).map(([envName, branch]) => {
//               console.log(envName, branch);
//               return (
//                 <TableRow key={envName}>
//                   <TableCell component={`th`} scope={`row`}>
//                     {envName}
//                   </TableCell>
//                   <TableCell align={`right`}>{branch}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

export default Deploy;
