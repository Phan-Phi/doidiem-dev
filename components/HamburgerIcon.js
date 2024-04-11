import { Box, styled } from "@mui/material";

const HEIGHT = 3;
const WIDTH = HEIGHT * 4;

const Hamburger = styled(Box)(({ theme }) => {
  return {
    width: WIDTH * 2,
    height: HEIGHT * 5,
    position: "relative",
    transform: "rotate(0deg)",
    transition: "0.5s ease-in-out",
    cursor: "pointer",
    ["& span"]: {
      display: "block",
      position: "absolute",
      height: HEIGHT,
      width: "50%",
      background: `${theme.palette.common.black}`,
      opacity: 1,
      transform: "rotate(0deg)",
      transition: ".25s ease-in-out",
    },

    ["& span:nth-of-type(even)"]: {
      left: "50%",
      borderRadius: `0 ${HEIGHT}px ${HEIGHT}px 0`,
    },
    ["& span:nth-of-type(odd)"]: {
      left: "0px",
      borderRadius: `${HEIGHT}px 0 0 ${HEIGHT}px`,
    },

    ["& span:nth-of-type(1), & span:nth-of-type(2)"]: {
      top: 0,
    },
    ["& span:nth-of-type(3), & span:nth-of-type(4)"]: {
      top: HEIGHT * 2,
    },
    ["& span:nth-of-type(5), & span:nth-of-type(6)"]: {
      top: HEIGHT * 4,
    },

    ["&.open"]: {
      ["& span:nth-of-type(1), & span:nth-of-type(6)"]: {
        transform: "rotate(45deg)",
      },
      ["& span:nth-of-type(2), & span:nth-of-type(5)"]: {
        transform: "rotate(-45deg)",
      },
      ["& span:nth-of-type(1)"]: {
        left: HEIGHT * 0.75,
        top: HEIGHT / 2,
      },

      ["& span:nth-of-type(2)"]: {
        left: `calc(50% - ${HEIGHT * 0.75}px)`,
        top: HEIGHT / 2,
      },

      ["& span:nth-of-type(3)"]: {
        left: "-50%",
        opacity: 0,
      },
      ["& span:nth-of-type(4)"]: {
        left: "100%",
        opacity: 0,
      },
      ["& span:nth-of-type(5)"]: {
        left: HEIGHT * 0.75,
        top: HEIGHT * 4 - HEIGHT / 2,
      },
      ["& span:nth-of-type(6)"]: {
        left: `calc(50% - ${HEIGHT * 0.75}px)`,
        top: HEIGHT * 4 - HEIGHT / 2,
      },
    },
  };
});

const HamburgerIcon = (props) => {
  return (
    <Hamburger {...props}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </Hamburger>
  );
};

export default HamburgerIcon;
