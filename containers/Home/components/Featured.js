import { useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { Box, Grid, Button, styled, useTheme } from "@mui/material";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

import { Image } from "../../../HOC";
import LineTitle from "../../../components/LineTitle/LineTitle";

import { Container } from "../../../components";
import useMedia from "../../../hooks/useMedia";
import DOMPurify from "isomorphic-dompurify";

const IMAGE_FRAME_RATIO = 390 / 790;
const IMAGE_RATIO = 351 / 767;
const IMAGE_HEIGHT = "65vh";

export default function Featured({ data }) {
  const theme = useTheme();
  const slickRef = useRef();
  const { isSmDown } = useMedia();
  const { tutorial_title, tutorial_subtitle, tutorial_content } = data;

  const [indexSlick, setIndexSlick] = useState(0);

  const settings = {
    infinite: true,

    speed: 300,
    slidesToShow:
      tutorial_content.length == 5 || tutorial_content.length == 4 ? 3 : 5,
    centerMode: true,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "75px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: "0px",
        },
      },
    ],
  };

  const renderTextSlickItem = useMemo(() => {
    const textSlickItem = tutorial_content[indexSlick].value.description;

    return (
      <Box
        sx={[
          {
            display: "-webkit-box",
            minHeight: 52,
            wordWrap: "break-word",
            fontSize: "16px",

            ["& *"]: {
              marginBottom: "0.75rem",
              lineHeight: 1.6,
            },
            ["& ol"]: {
              marginLeft: "1rem",
            },
            ["& ul"]: {
              marginLeft: "1.25rem",
            },
            ["& p"]: {
              margin: 0,
            },

            [theme.breakpoints.down("sm")]: {
              minHeight: 78,
            },
          },
        ]}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(textSlickItem, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
          }),
        }}
      ></Box>
    );
  }, [indexSlick]);

  return (
    <Wrapper>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <WrapperLineTitle>
              <LineTitle titleData={tutorial_title} type="left" />
            </WrapperLineTitle>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={6}>
                <ContentForSlickItem>{renderTextSlickItem}</ContentForSlickItem>
                <Box
                  sx={{
                    width: 0,
                    height: 0,
                    borderLeft: " 10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "20px solid white",
                    margin: "0 auto",
                  }}
                ></Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <GridContainer container sx={{}}>
          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",

                ["& .slick-slide"]: {
                  overflow: "hidden",
                },
                ["& .slick-track"]: {
                  paddingY: isSmDown ? "3.6rem" : "4rem",
                  paddingTop: "1.5rem",
                },
                ["& .slick-center"]: {
                  ["& .wrapper-image"]: {
                    transform: "scale(1, 0.975)",
                  },
                },
              }}
            >
              <Slider
                ref={slickRef}
                {...settings}
                beforeChange={(oldIndex, newIndex) => {
                  setIndexSlick(newIndex);
                }}
              >
                {tutorial_content.map((el, idx) => {
                  return (
                    <Box key={idx}>
                      <Image
                        src={el.value.image}
                        width={`calc(${IMAGE_HEIGHT} * ${IMAGE_RATIO})`}
                        height={IMAGE_HEIGHT}
                        WrapperProps={{
                          sx: {
                            marginX: "auto",
                            transform: "scale(0.75)",
                            transition: "500ms",
                            overflow: "hidden",
                            borderRadius: "20px",
                            top: "6px",
                            maxHeight: "450px",
                            maxWidth: `calc(450px * ${IMAGE_RATIO})`,
                          },
                          className: "wrapper-image",
                        }}
                        objectFit="unset"
                      />
                    </Box>
                  );
                })}
              </Slider>

              <StyledIphoneFrame className="iphone-frame"></StyledIphoneFrame>
            </Box>
          </Grid>
        </GridContainer>
      </Container>
      <Box id="blog"></Box>

      {data?.tutorial_image && (
        <WrapperTutorialImage>
          <Image
            src={data.tutorial_image}
            height={"100%"}
            width="100%"
            objectFit="cover"
          />
        </WrapperTutorialImage>
      )}
    </Wrapper>
  );
}

const ContentForSlickItem = styled(Box)(({ theme }) => {
  return {
    background: theme.palette.common.white,
    padding: "1rem",
    borderRadius: "1rem",

    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  };
});

const Wrapper = styled(Box)(({ theme }) => {
  return {
    paddingBottom: "5rem",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "3rem",
    },
  };
});

const WrapperTutorialImage = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  };
});

const GridContainer = styled(Grid)(({ theme }) => {
  return {
    [theme.breakpoints.down("md")]: {
      width: "calc(100% + 64px)",
      marginLeft: "-32px",
    },
  };
});

const StyledIphoneFrame = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "46.5%",
    left: "50%",
    width: `calc(${IMAGE_HEIGHT} * ${IMAGE_FRAME_RATIO})`,
    height: `calc(${IMAGE_HEIGHT})`,
    maxHeight: "450px",
    maxWidth: `calc(450px * ${IMAGE_FRAME_RATIO})`,
    zIndex: 2,
    backgroundImage: "url('/iphone-frame.png')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transform: "translate(-50%, -50%) ",
    pointerEvents: "none",
    [theme.breakpoints.down("sm")]: {
      top: "47%",
    },
  };
});

const WrapperLineTitle = styled(Box)(({ theme }) => {
  return {
    paddingTop: "2.5rem",
    paddingBottom: "2rem",
    // marginBottom: "2rem",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "1rem",
    },
  };
});

function PrevArrow({ onClick }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 99,
        borderRadius: "50%",
        borderColor: "primary.light",
        borderWidth: "2px",
        borderStyle: "solid",
        transform: "translateX(-54px)",
        transition: "all 0.5s",
        "&:hover": {
          backgroundColor: "rgb(0,0,0,0.05)",
        },
      }}
      onClick={onClick}
    >
      <Button
        sx={{
          minWidth: 0,
          borderRadius: "50%",
          zIndex: 99,
        }}
      >
        <ArrowRightAltOutlinedIcon
          sx={{
            transform: "rotate(180deg)",
            color: "primary.light",
            zIndex: 99,
          }}
        />
      </Button>
    </Box>
  );
}

function NextArrow({ onClick }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 1,
        borderRadius: "50%",
        borderColor: "primary.light",
        borderWidth: "2px",
        borderStyle: "solid",
        transform: "translateX(18px)",
        transition: "all 0.5s",
        "&:hover": {
          backgroundColor: "rgb(0,0,0,0.05)",
        },
      }}
      onClick={onClick}
    >
      <Button sx={{ minWidth: 0, borderRadius: "50%" }}>
        <ArrowRightAltOutlinedIcon
          sx={{
            color: "primary.light",
          }}
        />
      </Button>
    </Box>
  );
}
