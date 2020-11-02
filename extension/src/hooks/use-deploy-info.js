import { useEffect, useState } from "react";
import { envList } from "../utils/data";

const useDeployInfo = () => {
  const [envMap, setEnvMap] = useState({});

  useEffect(() => {
    setEnvMap(
      envList.reduce((acc, val) => {
        acc[val] = localStorage.getItem(val);
        return acc;
      }, {})
    );
  }, []);

  return { envMap };
};

export default useDeployInfo;
