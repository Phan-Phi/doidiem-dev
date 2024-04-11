import Slider from "react-slick";
import { useEffect, useMemo, useRef } from "react";
import { Box, Button, Container, Grid, styled } from "@mui/material";

import CardBrand from "../../../components/Card/CardBrand";
import LineTitle from "../../../components/LineTitle/LineTitle";
import Link from "../../../components/Link";

import { useMedia } from "../../../hooks";
import { Image } from "../../../HOC";
import EndPointScroll from "components/EndPointScroll";

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: false,
      },
    },
  ],
};

export default function Brand({ data, brandHomeData }) {
  const slickRef = useRef();
  const { partner_title } = data;
  const { isSmDown, isSmUp } = useMedia();

  const renderCardBrand = useMemo(() => {
    return brandHomeData.map((item, index) => {
      if (isSmUp) {
        return (
          <Grid item key={index} sm={6} md={3}>
            <CardBrand data={item} />
          </Grid>
        );
      } else {
        return (
          <Grid item key={index} xs={6}>
            <CardBrand data={item} />
          </Grid>
        );
      }
    });
  }, [brandHomeData, isSmUp]);

  useEffect(() => {
    if (slickRef.current) {
      slickRef.current.innerSlider.list.style.padding = "0 75px 0 0";
    }
  }, [slickRef, isSmDown]);

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <WrapperLineTitle>
            <LineTitle titleData={partner_title} type="left" />
          </WrapperLineTitle>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              overflowX: "hidden",

              "& .slick-slide": {
                width: "100%",
                margin: "0 20px",
                paddingBottom: 2,
              },
              "& button": {
                display: "none",
              },
              "& .slick-track": {
                display: "flex",
              },
            }}
          >
            <Slider ref={slickRef} {...settings}>
              {renderCardBrand}
            </Slider>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <WrapperButton>
            <Link href="/doi-tac" sx={{ textDecoration: "none" }}>
              <Button variant="outlined">XEM THÊM</Button>
            </Link>
          </WrapperButton>
        </Grid>
      </Container>

      {data?.partner_image && (
        <WrapperImage>
          <Image
            src={data.partner_image}
            height={"100%"}
            width="100%"
            objectFit="cover"
          />
        </WrapperImage>
      )}

      <EndPointScroll
        name="tutorial"
        numberMd={4}
        numberXl={5.5}
        numberSm={4.5}
      />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    paddingBottom: "5rem",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "3rem",
    },
  };
});

const WrapperLineTitle = styled(Box)(({ theme }) => {
  return {
    paddingTop: "2.5rem",
    paddingBottom: "4rem",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "2.5rem",
    },
  };
});

const WrapperButton = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: "2.5rem",

    [theme.breakpoints.down("sm")]: {
      paddingTop: "1.5rem",
    },
  };
});

const WrapperImage = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  };
});
