import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import ButtonLoading from "../shared/button-loading";
import { getLambdaPrefix } from "../../utils/data";

const FleetingLogger = ({
  logGroups,
  logGroupName,
  handleLambdaSelectChange,
  fetchLambdaLogs,
  envName,
  loading,
}) => (
  <div className={`col`} style={{ marginTop: "48px" }}>
    <FormControl
      variant={`outlined`}
      style={{ width: "300px", marginBottom: "16px" }}
    >
      <InputLabel id={`lambda-select-label`}>
        Choose lambda to fetch logs*
      </InputLabel>
      <Select
        labelId={`lambda-select-label`}
        id={`lambda-select`}
        value={logGroupName}
        onChange={handleLambdaSelectChange}
        label={`Lambda Picker`}
      >
        {logGroups.map((logGroup) => (
          <MenuItem key={logGroup.logGroupName} value={logGroup.logGroupName}>
            {logGroup.logGroupName.replace(getLambdaPrefix(envName), "")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <ButtonLoading
      style={{ width: "200px" }}
      handleClick={fetchLambdaLogs}
      loading={loading}
    >
      Fetch Lambda Logs
    </ButtonLoading>

    <p style={{ marginTop: "16px", fontSize: "13px" }}>
      *The lambda logs will be fetched for your current env ({envName}).
    </p>
    <p style={{ marginTop: "16px", fontSize: "13px" }}>
      *Only the log events from the latest stream are fetched since they are
      typically the most relevant.
    </p>
  </div>
);

export default FleetingLogger;
