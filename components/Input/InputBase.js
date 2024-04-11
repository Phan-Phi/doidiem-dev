import { forwardRef } from "react";
import { FormControl, FormHelperText, FormLabel, OutlinedInput } from "@mui/material";

const InputBase = forwardRef(
  (
    { FormControlProps, FormLabelProps, InputProps, FormHelperTextProps, ...props },
    ref
  ) => {
    return (
      <FormControl fullWidth={true} {...FormControlProps}>
        <FormLabel {...FormLabelProps} />
        <OutlinedInput inputRef={ref} {...props} {...InputProps} />

        <FormHelperText {...FormHelperTextProps} />
      </FormControl>
    );
  }
);

export default InputBase;
