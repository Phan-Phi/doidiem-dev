import { Box, Button, styled } from "@mui/material";

import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import ItemSlickBenefit from "./ItemSlickBenefit";

export default function SlickBenefit() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <WrapperSlick padding={4}>
      <Slider {...settings}>
        <ItemSlickBenefit />
        <ItemSlickBenefit />
        <ItemSlickBenefit />
        <ItemSlickBenefit />
      </Slider>
    </WrapperSlick>
  );
}

const WrapperSlick = styled(Box)(({ theme }) => {
  return {
    "& .slick-slider": {
      "& .slick-dots": {
        "& button:before": {
          fontSize: "9px",
        },

        "& button:hover:before": {
          color: theme.palette.primary.main,
          opacity: `0.5 !important`,
        },

        "& .slick-active": {
          "& button:before": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  };
});

function PrevArrow({ onClick }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "10px",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 99,
        // borderRadius: "50%",
        // borderColor: "primary.light",
        // borderWidth: "2px",
        // borderStyle: "solid",
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
        <ArrowForwardIosIcon
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
        top: "50%",
        right: "0",
        width: "36px",
        height: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        zIndex: 1,
        // borderRadius: "50%",
        // borderColor: "primary.light",
        // borderWidth: "2px",
        // borderStyle: "solid",
        transform: "translateX(18px)",
        transition: "all 0.5s",
        "&:hover": {
          backgroundColor: "rgb(0,0,0,0.05)",
        },
      }}
      onClick={onClick}
    >
      <Button sx={{ minWidth: 0, borderRadius: "50%" }}>
        <ArrowForwardIosIcon
          sx={{
            color: "primary.light",
          }}
        />
      </Button>
    </Box>
  );
}
