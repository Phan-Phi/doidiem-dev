import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePrevious } from "react-use";

import omit from "lodash/omit";
import isEqual from "lodash/isEqual";

import { transformUrl } from "../libs";

export const useParams = ({
  initState = {},
  callback = () => {},
  excludeKeys = [],
  isUpdateRouter = true,
  isShallow = true,
  isScroll = true,
}) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [params, setParams] = useState(initState);
  const prevParams = usePrevious(params);

  useEffect(() => {
    setParams((prev) => {
      const originalObj = { ...prev, ...router.query };

      const newObj = {};

      for (const key of Object.keys(originalObj)) {
        if (!!originalObj[key]) {
          newObj[key] = originalObj[key];
        }
      }

      return newObj;
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isEqual(prevParams, params)) {
      return;
    }

    const urlParams = omit(params, [...excludeKeys]);

    const pathname = transformUrl(router.pathname, urlParams);

    callback(params);

    if (isUpdateRouter) {
      router.push(pathname, pathname, {
        shallow: isShallow,
        scroll: isScroll,
      });
    }
  }, [callback, params, prevParams]);

  const paramsHandler = useCallback((value) => {
    setParams((prev) => {
      return {
        ...prev,
        ...value,
      };
    });
  }, []);

  const resetParams = useCallback(() => {
    setParams(initState);
  }, []);

  return [params, paramsHandler, isReady, resetParams];
};

export default useParams;
