import { IconButton, InputBase, Paper, useTheme } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import useMedia from "../../hooks/useMedia";

export default function InputSendMail() {
  const theme = useTheme();
  const { isSmUp, isSmDown, isMdUp } = useMedia();
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
      <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
      <FilledInput
        id="filled-adornment-password"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
