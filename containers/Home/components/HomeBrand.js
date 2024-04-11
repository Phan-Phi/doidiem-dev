import { Box, Button, Container, Grid, Stack, useTheme } from "@mui/material";
import React from "react";
import CardBrand from "../../../components/Card/CardBrand";
import LineTitle from "../../../components/LineTitle/LineTitle";
import Link from "../../../components/Link";
import useMedia from "../../../hooks/useMedia";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  slidesToShow: 2,
  slidesToScroll: 1,
};

export default function HomeBrand({ data, brandHomeData }) {
  const { partner_title } = data;
  const { isSmDown, isMdDown, isSmUp } = useMedia();
  const theme = useTheme();
  const renderCardBrand = () => {
    return brandHomeData.map((item, index) => {
      if (isSmUp) {
        return (
          <Grid item key={index} xs={3} sm={6} md={3}>
            <CardBrand data={item} />
          </Grid>
        );
      } else {
        return (
          <Grid item key={index} xs={3}>
            <CardBrand data={item} />
          </Grid>
        );
      }
    });
  };

  return (
    <Box
      // id="partner"
      sx={{
        backgroundColor: isSmDown ? "white" : theme.palette.common.natural3,
        textAlign: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          margin: "0 auto",
        }}
      >
        <LineTitle titleData={partner_title} type="left" />

        {isSmUp ? (
          <Grid
            container
            spacing={isMdDown ? 5 : 10}
            sx={{
              paddingTop: "2rem",
              height: "100%",
            }}
          >
            {renderCardBrand()}
          </Grid>
        ) : (
          // <Stack
          //   direction="row"
          //   spacing={isSmDown ? 5 : 3}
          //   sx={{
          //     marginTop: "3rem",
          //     width: "90vw",
          //     overflowX: "scroll",
          //     "& .slider-wrapper": {
          //       marginBottom: 0,
          //     },
          //     "&::-webkit-scrollbar": {
          //       display: "none",
          //     },
          //   }}
          // >
          //   {renderCardBrand()}
          //   </Stack>
          <Grid
            direction="row"
            spacing={isSmDown ? 5 : 3}
            sx={{
              // backgroundColor: "gray",
              padding: "0 1rem",
              marginTop: "3rem",
              width: "90vw",
              marginLeft: "auto",
              overflowX: "hidden",

              "& .slick-slider": {
                width: "150%",
              },
              "& .slick-slide": {
                width: "100%",
                margin: "0 20px",
              },
              "& button": {
                display: "none",
              },
              "& .slick-track": {
                display: "flex",
              },
            }}
          >
            <Slider {...settings}>{renderCardBrand()}</Slider>
          </Grid>
        )}
      </Container>
      <Link href="/doi-tac" sx={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          sx={{ marginTop: "2rem", marginBottom: "2.5rem" }}
        >
          XEM THÊM
        </Button>
      </Link>
    </Box>
  );
}
