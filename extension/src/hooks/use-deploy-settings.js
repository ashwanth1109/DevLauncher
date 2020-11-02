import { useState } from "react";
import { envList, optionsList } from "../utils/data";

const useDeploySettings = (url) => {
  const [env, setEnv] = useState(0);

  const [options, setOptions] = useState(
    optionsList.reduce((acc, val) => {
      acc[val] = false;

      return acc;
    }, {})
  );

  const handleDeploy = () => {
    const { install, deploy, start, clean, seed, destroy } = options;

    const branch = url
      .replace("https://github.com/trilogy-group/", "")
      .split("/")[2];

    localStorage.setItem(envList[env], branch);

    window.open(
      `https://trilogy.devspaces.com/#env=${envList[env]},install=${install},clean=${clean},deploy=${deploy},start=${start},seed=${seed},destroy=${destroy}/${url}`
    );
  };

  return {
    handleDeploy,
    chooseEnvProps: { env, setEnv, envList },
    deployOptionsProps: { options, setOptions },
  };
};

export default useDeploySettings;
