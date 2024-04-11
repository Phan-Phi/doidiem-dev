import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, Fragment } from "react";

import { Box, Stack, Typography, useTheme, styled, Grid } from "@mui/material";
import { ReaderHTML, Container } from "../../../components";
import { Image } from "../../../HOC";
import useMedia from "../../../hooks/useMedia";

const ModelContainer = dynamic(() => import("./ModelContainer"), {
  ssr: false,
});

export default function HomeBanner({ data }) {
  const { banner, subtitle } = data;
  const { isSmDown, isMdDown, isLgDown } = useMedia();
  const theme = useTheme();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundImage: `url(${banner})`,
        height: "90vh",
        position: "relative",
      }}
    >
      <Canvas shadows>
        <Suspense fallback={null}>{/* <ModelContainer /> */}</Suspense>
      </Canvas>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "100%",
        }}
      >
        <Point
          sx={{
            top: "25%",
            left: "25%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            Lorem ipsum dolor sit amet sit amet sit amet elit.
          </PointText>
        </Point>
        <Point
          sx={{
            top: "75%",
            left: "25%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            Lorem ipsum dolor sit amet sit amet sit amet elit.
          </PointText>
        </Point>
        <Point
          sx={{
            top: "25%",
            left: "75%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            Lorem ipsum dolor sit amet sit amet sit amet elit.
          </PointText>
        </Point>
        <Point
          sx={{
            top: "75%",
            left: "75%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            Lorem ipsum dolor sit amet sit amet sit amet elit.
          </PointText>
        </Point>
      </Box>

      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "10rem",
          transform: "translateY(-50%)",
          width: "50%",
          pointerEvents: "none",
          ...(isLgDown && {
            left: "5rem",
          }),
          ...(isMdDown && {
            left: "24px",
          }),
        }}
      >
        <Box
          sx={{
            "& .MuiBox-root span:after": {
              display: "none",
            },
            "& .MuiBox-root span": {
              color: `${theme.palette.secondary.main} !important`,
            },
            "& .MuiBox-root h1": {
              lineHeight: "3rem",
              margin: "0.5rem 0",
            },
            "& .MuiBox-root h2": {
              lineHeight: "2.5rem",
            },
          }}
        >
          <ReaderHTML content={subtitle} />
        </Box>

        <Stack direction="row" spacing={3}>
          <Image
            {...{
              src: "/icon_gg.png",
              width: "120px",
              height: "60px",
              objectFit: "contain",
            }}
          />
          <Image
            {...{
              src: "/icon_apple.png",
              width: "120px",
              height: "60px",
              objectFit: "contain",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

const Point = styled(Box)(() => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    ["&:hover .help-text"]: {
      opacity: 1,
    },
  };
});

const PointLabel = styled(Box)(() => {
  return {
    position: "absolute",
    top: "-20px",
    left: "-20px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#00000077",
    border: "1px solid #ffffff77",
    color: "#ffffff",
    textAlign: "center",
    cursor: "help",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const PointText = styled(Box)(() => {
  return {
    position: "absolute",
    top: "30px",
    width: "120px",
    padding: "20px",
    borderRadius: "4px",
    background: "#00000077",
    border: "1px solid #ffffff77",
    color: "#ffffff",
    lineHeight: "1.3em",
    fontSize: "14px",
    opacity: 0,
    transition: "opacity 0.3s",
    pointerEvents: "none",
    transform: "translateX(-50%)",
  };
});
