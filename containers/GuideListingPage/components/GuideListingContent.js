import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Box, Typography, styled } from "@mui/material";

import RenderHTMLTwo from "components/ReaderHTMLTwo";
import ContentDetailHTML from "components/RenderHTML/ContentDetailHTML";
import ContentHTMLBlockType from "components/RenderHTML/ContentHTMLBLockType";

export default function GuideListingContent({ data }) {
  const dataContent = data.items[0];
  // throw new Error("Parameter is not a number!");
  const { title, sections, content } = dataContent;

  const [ref, { width }] = useMeasure();

  const renderItem = useMemo(() => {
    if (sections == undefined) return;

    return sections.map((el) => {
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
  }, [sections, width]);

  const renderItemParent = useMemo(() => {
    if (content == undefined || content.length === 0) return;

    return <ContentHTMLBlockType body={content} />;
  }, [content, width]);

  return (
    <Box ref={ref}>
      <Title>{title}</Title>
      {renderItemParent}
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
