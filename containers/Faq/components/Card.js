import { useEffect, useRef, useState } from "react";
import { Box, styled, Typography, Fade } from "@mui/material";

import { Image } from "../../../HOC";

const DUMB_IMAGE = "/faq.png";

const Card = ({ data }) => {
  const ref = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight((ref.current.clientWidth * 2) / 3);
    }
  }, []);

  return (
    <Fade
      in={true}
      timeout={{
        enter: 500,
      }}
    >
      <Wrapper ref={ref} width={"100%"} height={height}>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "20%",
            zIndex: 2,
          }}
        >
          <Typography>{data.title}</Typography>
        </Box>
        <ImageWrapper>
          <Image
            width="100%"
            height={"100%"}
            src={data.thumbnail || DUMB_IMAGE}
            objectFit="cover"
          />
        </ImageWrapper>
      </Wrapper>
    </Fade>
  );
};

export default Card;

const Wrapper = styled(Box)(({}) => {
  return {
    position: "relative",
    transition: "all .3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
    borderRadius: 5,
    overflow: "hidden",
  };
});

const ImageWrapper = styled(Box)(({}) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    right: 0,
    bottom: 0,
  };
});
