import React from "react";
import { Controller } from "react-hook-form";
import { IconButton, InputBase, Paper, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useMedia from "../../hooks/useMedia";

export default function InputPageNew({ control, name, InputProps }) {
  const theme = useTheme();
  const { isSmDown } = useMedia();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Paper
            sx={[
              {
                boxShadow: "none",
                border: `2px solid ${theme.palette.common.natural4}`,
                borderRadius: "12px",
                p: "5px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: "2.3rem",
                marginTop: "5.5rem",
              },
              isSmDown && { marginBottom: "1.5rem", marginTop: "1.5rem" },
            ]}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "15px",
                color: " theme.palette.common.natural1",
                opacity: 1,
              }}
              {...InputProps}
              {...field}
            />
            <IconButton
              type="submit"
              color="primary"
              sx={{
                p: "10px",
                width: "2.2rem",
                height: "2.2rem",
                backgroundColor: theme.palette.secondary.light,
              }}
              aria-label="directions"
            >
              <SearchIcon
                sx={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            </IconButton>
          </Paper>
        );
      }}
    />
  );
}
