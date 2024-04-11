import { useState, createContext } from "react";

export const Context = createContext({});

const Global = ({ children }) => {
  const [state, setState] = useState({});

  return <Context.Provider value={{ state, set: setState }}>{children}</Context.Provider>;
};

export default Global;
