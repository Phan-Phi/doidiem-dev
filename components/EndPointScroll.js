import { Box, styled } from "@mui/material";

export default function EndPointScroll({ name, numberMd, numberXl, numberSm }) {
  return (
    <Wrapper
      id={name}
      numberMd={numberMd}
      numberXl={numberXl}
      numberSm={numberSm}
    ></Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme, numberMd, numberXl, numberSm }) => {
  return {
    position: "absolute",

    [theme.breakpoints.up("md")]: {
      bottom: `${numberXl}rem`,
    },
    [theme.breakpoints.down("md")]: {
      bottom: `${numberMd}rem`,
    },

    [theme.breakpoints.down("sm")]: {
      bottom: `${numberSm}rem`,
    },
  };
});
