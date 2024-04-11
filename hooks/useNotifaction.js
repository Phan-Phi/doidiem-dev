import { useCallback, useState } from "react";

import { useSnackbar } from "notistack";

import axios from "axios";

import get from "lodash/get";

export const useNotification = () => {
  const [loadingNoti, setLoadingNoti] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueSnackbarWithSuccess = useCallback((message) => {
    enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    });
  }, []);

  const enqueueSnackbarWithError = useCallback((err) => {
    if (axios.isAxiosError(err)) {
      const message = get(err, "response.data.message");

      if (message) {
        enqueueSnackbar(message, {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
        });
      }
    }
  }, []);

  return {
    loadingNoti,
    setLoadingNoti,
    enqueueSnackbar,
    closeSnackbar,
    enqueueSnackbarWithSuccess,
    enqueueSnackbarWithError,
  };
};
