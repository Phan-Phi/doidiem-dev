import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Box, Stack, Typography, styled } from "@mui/material";

import { Image } from "HOC";
import Link from "components/Link";
import useMedia from "hooks/useMedia";

export default function RegisterMobileApp({ title, android, ios }) {
  const [ref, { width }] = useMeasure();
  const { isSmDown, isMdUp } = useMedia();

  const renderImage = useMemo(() => {
    const demo = width - 16;

    return (
      <Stack spacing={2.5} direction="row" justifyContent={"center"}>
        <Link target="_blank" href={android}>
          <Image
            {...{
              src: "/icon_gg.png",
              width: isSmDown ? `${demo / 2}px` : "120px",
              height: "60px",
              objectFit: "contain",
            }}
          />
        </Link>

        <Link target="_blank" href={ios}>
          <Image
            {...{
              src: "/icon_apple.png",
              width: isSmDown ? `${demo / 2}px` : "120px",
              height: "60px",
              objectFit: "contain",
            }}
          />
        </Link>
      </Stack>
    );
  }, [isSmDown, width]);

  return (
    <Wrapper ref={ref}>
      {isMdUp ? (
        <Box>
          <QrSubtitle variant="caption2_bold">{title}</QrSubtitle>
        </Box>
      ) : (
        <Link target="_blank" href="https://doidiem.vn/qrmerchant">
          <QrSubtitle variant="caption2_bold">{title}</QrSubtitle>
        </Link>
      )}

      {isMdUp && renderImage}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    display: "block",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      width: "350px",
    },
  };
});

const QrSubtitle = styled(Typography)(({ theme }) => {
  return {
    display: "block",
    textAlign: "center",

    marginTop: "2.5rem",
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body2_bold,
      marginBottom: "0.8rem",
      textDecoration: "underline",
    },
  };
});
