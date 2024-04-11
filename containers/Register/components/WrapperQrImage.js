import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Box, styled } from "@mui/material";

import { Image } from "HOC";
import useMedia from "hooks/useMedia";

export default function WrapperQrImage() {
  const { isSmDown } = useMedia();
  const [ref, { width }] = useMeasure();

  const render = useMemo(() => {
    return (
      <Image
        {...{
          src: "/qrmerchant.png",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    );
  }, [width, isSmDown]);

  return (
    <Box ref={ref}>
      <Wrapper dataWidth={width} isSmDown={isSmDown}>
        {render}
      </Wrapper>
    </Box>
  );
}

const Wrapper = styled(Box)(({ theme, dataWidth, isSmDown }) => {
  return {
    boxShadow: " 0px 8px 24px 0 rgba(0, 0, 0, 0.15)",
    borderRadius: "12px",
    width: isSmDown ? dataWidth : "350px",
    height: isSmDown ? dataWidth : "350px",
    margin: "0 auto",
    padding: "2rem",
  };
});
