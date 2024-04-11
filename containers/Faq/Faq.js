import { useRouter } from "next/router";
import { useMeasure } from "react-use";
import { Box, Grid, Typography, Container } from "@mui/material";

import BannerTop from "../../components/BannerTop/BannerTop";
import LineTitle from "../../components/LineTitle/LineTitle";
import { Image } from "../../HOC";
import useMedia from "../../hooks/useMedia";
import SEO from "components/SEO";
import { getSeoObject } from "utils/getSeoObject";

const IMAGE_RATIO = 255 / 335;

export default function FAQ({ initData }) {
  const router = useRouter();
  const [FAQMeta, detailFAQ] = initData;
  const { banner, title, meta } = FAQMeta.items[0];
  const listData = detailFAQ.items;
  const metaSeo = meta;

  const { isSmUp, isSmDown, isMdDown } = useMedia();

  if (listData == undefined) {
    return null;
  }

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={banner} />

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
      >
        <Grid container rowSpacing={4} columnSpacing={8}>
          <Grid item xs={12}>
            <Box
              sx={[
                {
                  paddingTop: 5,
                  paddingBottom: 1,
                },
              ]}
            >
              <LineTitle titleData={title} type="center" />
            </Box>
          </Grid>

          {listData.map((item, idx) => {
            return (
              <Grid
                item
                key={idx}
                xs={12}
                sm={6}
                md={4}
                onClick={() => {
                  const faqId = item.id;
                  router.push(`${router.pathname}/${faqId}`);
                }}
              >
                <CardItem data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

const CardItem = ({ data }) => {
  const [ref, { width }] = useMeasure();
  const { thumbnail, title } = data;

  return (
    <Box
      ref={ref}
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
        border: "4px solid rgba(177, 181, 195, 1)",
      }}
    >
      <Image
        {...{
          src: thumbnail,
          width: "100%",
          height: width * IMAGE_RATIO,
          objectFit: "cover",
        }}
      />
      <Typography
        variant="hairline1"
        sx={{ position: "absolute", top: "24px", left: "24px" }}
      >
        {title}
      </Typography>
    </Box>
  );
};
