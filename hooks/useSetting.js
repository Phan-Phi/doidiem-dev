import { useContext } from "react";

import { SettingContext } from "../context";

const useSetting = () => {
  const context = useContext(SettingContext);

  return context;
};

export default useSetting;
