import {
  FormControl,
  FormHelperText,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import get from "lodash/get";

export default function InputNumber({
  required,
  label,
  control,
  name,
  error,
  ...props
}) {
  const theme = useTheme();
  const keyMessage = get(error, "message");
  let message = "";

  if (keyMessage) {
    message = "Vui lòng nhập thông tin";
  }
  return (
    <FormControl
      fullWidth
      error={!!error ? true : false}
      sx={{ marginBottom: "1.6rem" }}
    >
      <TextField
        {...props}
        control={control}
        label={label}
        id="outlined-required"
        fullWidth
        color="secondary"
        focused
        sx={{
          transition: "all 0.5s",
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: `${theme.palette.common.natural3} !important`,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: !!error
              ? `${theme.palette.error.main} !important`
              : theme.palette.common.natural2,
            paddingLeft: "1.2rem",
            fontSize: "1.3rem",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: !!error
              ? `${theme.palette.error.main} !important`
              : `${theme.palette.common.natural2} !important`,
            paddingLeft: "1.25rem",
            borderRadius: "0.5rem",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend span":
            {
              padding: "0",
            },
          "& .MuiOutlinedInput-root input": {
            fontSize: "0.9rem",
            padding: "13.5px 14px",
          },
        }}
      />
      <FormHelperText children={message || ""} sx={{ textAlign: "right" }} />
    </FormControl>
  );
}
