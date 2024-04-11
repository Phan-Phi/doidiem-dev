import { Box } from "@mui/material";

import { Image } from "../../HOC";
import { useMedia } from "../../hooks";

import { TOP_BANNER_RATIO } from "../../constants";
import { useState } from "react";

export default function BannerTop({ imageSrc }) {
  const { isSmUp } = useMedia();

  return (
    <Box>
      <Image
        {...{
          src: imageSrc,
          width: "100vw",
          height: isSmUp
            ? `calc(100vw / ${TOP_BANNER_RATIO})`
            : `calc(100vw / ${375 / 130})`,
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
