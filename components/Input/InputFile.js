import { Button, Stack, styled, Typography, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Fragment } from "react";

const InputFile = styled("input")({
  display: "none",
});

export default function InputFiles({ required, label, control, name }) {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Fragment>
            <label htmlFor="contained-button-file">
              <InputFile
                value={value || ""}
                onChange={onChange}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button variant="outlined" component="span">
                <Stack direction="row" spacing={1} alignItems="center">
                  <UploadFileOutlinedIcon
                    sx={{ color: theme.palette.common.natural2 }}
                  />
                  <Typography
                    variant="button2"
                    sx={{ color: theme.palette.common.natural2 }}
                  >
                    {label}
                  </Typography>
                </Stack>
              </Button>
            </label>
          </Fragment>
        );
      }}
    />
  );
}
