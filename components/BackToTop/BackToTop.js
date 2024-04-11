import { Box, Slide, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Link from "../Link";
import useMedia from "../../hooks/useMedia";
import { useWindowScroll } from "react-use";

export default function BackToTop() {
  const { y } = useWindowScroll();
  const { isSmUp, isSmDown, isMdUp } = useMedia();
  const theme = useTheme();
  const [animationState, setAnimationState] = useState(false);

  useEffect(() => {
    if (y > 880) {
      setAnimationState(true);
    }
    if (y < 50) {
      setAnimationState(false);
    }
  }, [y]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "5rem",
        right: "2rem",
        zIndex: 12,
      }}
    >
      <Link href="#Home">
        <Slide direction="up" in={animationState} mountOnEnter unmountOnExit>
          <ArrowUpwardRoundedIcon
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "5px",
              padding: "5px",
              color: "white",
              fontSize: isSmDown ? "35px" : "40px",
            }}
          />
        </Slide>
      </Link>
    </Box>
  );
}
