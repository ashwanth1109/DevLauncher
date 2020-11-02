import { useState } from "react";

const useTopBar = () => {
  const [tab, setTab] = useState(0);

  const onTabChange = (_, val) => {
    setTab(val);
  };

  return { tab, onTabChange };
};

export default useTopBar;
