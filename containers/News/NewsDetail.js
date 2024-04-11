import get from "lodash/get";

import {
  Box,
  Grid,
  Chip,
  Stack,
  styled,
  Container,
  Typography,
} from "@mui/material";
import { useMeasure } from "react-use";
import { useRouter } from "next/router";

import { Image } from "HOC";
import { useMedia } from "../../hooks";
import { getSeoObject } from "utils/getSeoObject";
import { BannerTop, SEO } from "../../components";

import ContentHTMLBlockType from "components/RenderHTML/ContentHTMLBLockType";

export default function NewDetail({ initData }) {
  const [detailBlogPost] = initData;

  const metaSeo = get(detailBlogPost, "meta");

  const router = useRouter();
  const { isMdDown } = useMedia();
  const [ref, { width }] = useMeasure();

  if (detailBlogPost == undefined) {
    return null;
  }

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      {detailBlogPost.banner && <BannerTop imageSrc={detailBlogPost.banner} />}

      {/* <HeadBanner imageSrc={detailBlogPost.banner} /> */}

      <Container
        maxWidth="lg"
        sx={[
          {
            paddingBottom: 10,
          },
          isMdDown && {
            paddingBottom: 6,
          },
        ]}
        ref={ref}
      >
        <Grid container>
          <Grid item xs={12}>
            <Title variant="h5">{detailBlogPost.title}</Title>
          </Grid>

          <Grid item xs={12}>
            <ContentHTMLBlockType body={detailBlogPost.content} />

            {/* <ReaderHTML data={detailBlogPost} containerWidth={width} /> */}
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              {get(detailBlogPost, "tags").map((el) => {
                return (
                  <Chip
                    onClick={() => {
                      router.push(`/tin-tuc?tags=${el}`);
                    }}
                    label={el}
                    key={el}
                    clickable
                    sx={{
                      backgroundColor: "secondary.light",
                      color: "common.white",
                    }}
                  />
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const HeadBanner = ({ imageSrc }) => {
  const [ref, { width }] = useMeasure();

  return (
    <Box ref={ref}>
      <Image
        {...{
          src: imageSrc,
          width: "100vw",
          height: (width * 9) / 16,
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

const Title = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.secondary.main,
    textAlign: "center",
    // marginTop: 5,
    // marginBottom: 5,
    margin: "2.5rem",
  };
});
