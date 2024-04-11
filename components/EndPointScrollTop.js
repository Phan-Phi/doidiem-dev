import { Box, styled } from "@mui/material";

export default function EndPointScrollTop({
  name,
  numberMd,
  numberXl,
  numberSm,
}) {
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
      top: `${numberXl}rem`,
    },
    [theme.breakpoints.down("md")]: {
      top: `${numberMd}rem`,
    },

    [theme.breakpoints.down("sm")]: {
      top: `${numberSm}rem`,
    },
  };
});
