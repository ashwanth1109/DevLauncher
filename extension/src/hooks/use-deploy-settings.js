import { useState } from "react";
import { envList, optionsList } from "../utils/data";
import booleanToBit from "../utils/booleanToBit";

const useDeploySettings = ({ url, hash, addItemToHistory }) => {
  const [env, setEnv] = useState(0);
  const envName = envList[env];

  const [options, setOptions] = useState(
    optionsList.reduce((acc, val) => {
      acc[val] = false;

      return acc;
    }, {})
  );

  const handleDeploy = () => {
    const { deploy, start, clean, seed, destroy, test } = options;

    // Store data for info tracker
    const branch = url
      .replace("https://github.com/trilogy-group/", "")
      .split("/")[2];
    localStorage.setItem(envList[env], branch);

    // Store data for history tracker
    const runOptions = [];
    Object.entries(options).map(([key, val]) => {
      if (val) runOptions.push(key);
    });

    addItemToHistory(envName, new Date(), hash, runOptions);

    const optionArr = [clean, destroy, deploy, seed, test, start];

    const mode = optionArr.reduce(
      (acc, val) => `${acc}${booleanToBit(val)}`,
      "mode="
    );

    window.open(`https://trilogy.devspaces.com/#env=${envName},${mode}/${url}`);
  };

  return {
    handleDeploy,
    chooseEnvProps: { env, setEnv, envList },
    deployOptionsProps: { options, setOptions },
  };
};

export default useDeploySettings;
