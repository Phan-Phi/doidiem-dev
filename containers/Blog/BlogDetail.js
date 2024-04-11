import { useCallback } from "react";
import { useRouter } from "next/router";

import createDOMPurify from "isomorphic-dompurify";
import { Container, Grid, Box, Typography } from "@mui/material";

import TagList from "./components/TagList";

const BlogDetail = ({ ...props }) => {
  const { initBlogDetail } = props;

  const router = useRouter();
  const { content, title, banner, tags } = initBlogDetail;

  const selectTagHandler = useCallback((id) => {
    return () => {
      router.push(`/tin-tuc?tags=${id}`);
    };
  }, []);

  return (
    <Box
      sx={{
        paddingY: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent={"center"}>
          <Grid item md={9} xl={9}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>

            <Box marginY={4}>
              <img src={banner} width="100%" />
            </Box>

            <Box
              dangerouslySetInnerHTML={{
                __html: createDOMPurify.sanitize(content),
              }}
            ></Box>

            <Box marginTop={4}>
              <Typography
                sx={{
                  fontWeight: 500,
                  marginBottom: 1.5,
                }}
              >
                Thẻ bài viết
              </Typography>

              <TagList
                {...{
                  items: tags,
                  selectedItem: null,
                  selectTagHandler: selectTagHandler,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogDetail;
