import React from "react";
import { IconButton, InputBase, Paper, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useMedia from "../../hooks/useMedia";

export default function InputPagePartner({ name, InputProps, onChange }) {
  const theme = useTheme();
  const { isSmDown } = useMedia();
  return (
    <Paper
      sx={[
        {
          boxShadow: "none",
          border: `2px solid ${theme.palette.common.neutral4}`,
          borderRadius: "12px",
          p: "5px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "2.3rem",
          marginTop: "5.5rem",
        },
        isSmDown && { marginBottom: "1.5rem", marginTop: "3.5rem" },
      ]}
    >
      <InputBase
        onChange={onChange}
        sx={{
          ml: 1,
          flex: 1,
          fontSize: "15px",
          color: " theme.palette.common.natural1",
          opacity: 1,
        }}
        {...InputProps}
      />

      <SearchIcon
        sx={{
          color: `${theme.palette.common.neutral4} !important`,
          width: "1.5rem",
          height: "1.5rem",
        }}
      />
    </Paper>
  );
}
