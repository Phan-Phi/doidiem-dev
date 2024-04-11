import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Box, Typography, styled } from "@mui/material";

import RenderHTMLTwo from "components/ReaderHTMLTwo";
import ContentDetailHTML from "components/RenderHTML/ContentDetailHTML";
import ContentHTMLBlockType from "components/RenderHTML/ContentHTMLBLockType";

export default function GuideDetailContent({ data, title, dataContent }) {
  const [ref, { width }] = useMeasure();

  const renderItem = useMemo(() => {
    if (data == undefined) return;

    return data.map((el) => {
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
  }, [data, width]);

  const renderItemTop = useMemo(() => {
    if (dataContent == undefined || dataContent.length === 0) return;

    return <ContentHTMLBlockType body={dataContent} />;
  }, [dataContent, width]);

  return (
    <Box ref={ref}>
      <Title>{title}</Title>
      {renderItemTop}
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
