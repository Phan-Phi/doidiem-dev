import { useCallback, forwardRef } from "react";

import {
  Dialog,
  DialogContent as MuiDialogContent,
  styled,
  Fade,
} from "@mui/material";

const Transition = forwardRef(function (props, ref) {
  return (
    <Fade
      ref={ref}
      {...props}
      timeout={{
        enter: 500,
        exit: 300,
      }}
    />
  );
});

const PortfolioDetailDialog = ({ open, toggle, children }) => {
  const closeHandler = useCallback((e) => {
    toggle(false);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      fullScreen
      TransitionComponent={Transition}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PortfolioDetailDialog;

const DialogContent = styled(MuiDialogContent)(({ theme }) => {
  return {
    padding: 0,
  };
});
