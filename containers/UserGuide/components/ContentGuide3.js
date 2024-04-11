import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Box, Typography, styled } from "@mui/material";

import RenderHTMLTwo from "components/ReaderHTMLTwo";
import ContentDetailHTML from "components/RenderHTML/ContentDetailHTML";

export default function ContentGuide3({ dataTitle, dataSections, dataId }) {
  const [ref, { width }] = useMeasure();

  const { data: resData } = useSWR(() => {
    return transformUrl(PAGES, {
      fields: "*",
      type: "guide.GuideDetailPage",
      child_of: id,
    });
  });

  const renderItem = useMemo(() => {
    if (dataSections == undefined) return;

    return dataSections.map((el) => {
      const { value } = el;

      if (value.sections.length > 0) {
        return (
          <Box id={value.tag_id} key={value.tag_id}>
            <Typography variant="button">{value.title}</Typography>
            <ContentDetailHTML body={value.content} />
            {renderBody(value.sections, width)}
          </Box>
        );
      }

      return (
        <Box id={value.tag_id} key={value.tag_id}>
          <Typography variant="button">{value.title}</Typography>
          <ContentDetailHTML body={value.content} />
        </Box>
      );
    });
  }, [dataSections, width]);

  return (
    <Box ref={ref}>
      <Title>{dataTitle}</Title>

      {renderItem}
    </Box>
  );
}

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h5,
    marginBottom: "1rem",
  };
});

const renderBody = (props, width) => {
  return props.map((el) => {
    if (el.sections === undefined) {
      return (
        <Box id={el.tag_id} key={el.tag_id}>
          <Typography variant="button">{el.title}</Typography>
          <ContentDetailHTML body={el.content} />
        </Box>
      );
    } else if (el.sections.length > 0) {
      return (
        <Box id={el.tag_id} key={el.tag_id}>
          <Typography variant="button">{el.title}</Typography>
          <ContentDetailHTML body={el.content} />

          {renderBody(el.sections, width)}
        </Box>
      );
    }

    return (
      <Box id={el.tag_id} key={el.tag_id}>
        <Typography variant="button">{el.title}</Typography>
        <ContentDetailHTML body={el.content} />
      </Box>
    );
  });
};
