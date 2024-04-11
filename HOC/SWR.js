import { SWRConfig } from "swr";

import axios from "../axios.config";

const SWR = ({ children, fallback = {} }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          return axios.get(resource, init).then((res) => {
            return res.data;
          });
        },
        onError: (err) => {},
        fallback,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWR;
