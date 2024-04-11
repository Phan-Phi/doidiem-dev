import { useContext } from "react";

import { GlobalContext } from "../context";

const useGlobal = () => {
  const context = useContext(GlobalContext);

  return context;
};

export default useGlobal;
