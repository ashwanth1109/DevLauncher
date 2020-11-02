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

export default Deploy;
