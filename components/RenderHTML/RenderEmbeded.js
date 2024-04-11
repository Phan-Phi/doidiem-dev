import { useMeasure } from "react-use";
import { useEffect, useState } from "react";

import DOMPurify from "isomorphic-dompurify";
import { extract, VideoTypeData } from "oembed-parser";
import useMedia from "hooks/useMedia";
import { Box } from "@mui/material";

const RenderEmbeded = (props) => {
  const { src } = props;
  const { isMdDown } = useMedia();

  const [data, setData] = useState();
  const [ref, { width: containerWidth }] = useMeasure();

  useEffect(() => {
    extract(src)
      .then((oembed) => {
        setData(oembed);
      })
      .catch(() => {
        //
      });
  }, [src]);

  if (data == undefined) return null;

  const { width: videoWidth, height: videoHeight } = data;
  const VIDEO_RATIO = videoWidth / videoHeight;

  const defaultWidth = containerWidth < 500 ? containerWidth : 500;

  const frameWidth = parseInt(props.width || "0") || defaultWidth;

  const finalWidth =
    isMdDown || containerWidth < frameWidth ? containerWidth : frameWidth;

  const finalHeight = finalWidth / VIDEO_RATIO;

  return (
    <Box
      ref={ref}
      sx={{
        ["& iframe"]: {
          width: finalWidth,
          height: finalHeight,
        },
      }}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data.html, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
        }),
      }}
    />
  );
};

export default RenderEmbeded;
