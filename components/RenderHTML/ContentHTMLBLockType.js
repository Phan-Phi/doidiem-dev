import { Box } from "@mui/material";
import React, { useMemo } from "react";

import RenderEmbeded from "./RenderEmbeded";
import RenderHTMLContent from "./RenderHTMLContent";

export default function ContentHTMLBlockType({ body }) {
  const renderHTML = useMemo(() => {
    if (body == undefined) return null;

    return body.map((item, index) => {
      const { block_type, value } = item;

      if (block_type === "embed") {
        return <RenderEmbeded key={index} {...value} />;
      } else if (block_type === "content") {
        return <RenderHTMLContent key={index} data={value} />;
      }
      return null;
    });
  }, [body]);

  return <Box>{renderHTML}</Box>;
}
