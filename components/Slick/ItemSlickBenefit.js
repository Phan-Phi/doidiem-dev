import { useMeasure } from "react-use";
import { Box, Grid, styled, Typography } from "@mui/material";

import { Image } from "HOC";

export default function ItemSlickBenefit() {
  const [ref, { width }] = useMeasure();
  //   console.log("🚀 ~ ItemSlickBenefit ~ width:", width);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={5}>
          <WrapperImage ref={ref}>
            <Image
              src={"/img/Rectangle 5.jpg"}
              width={"100%"}
              height={(width * 3) / 4}
              objectFit="cover"
            />
          </WrapperImage>
        </Grid>

        <Grid item md={7}>
          <Box>
            <Title>sss</Title>
            <Content>sdfasdfdsfsfsdfasdfasdf</Content>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const WrapperImage = styled(Box)(({ theme }) => {
  return {
    overflow: "hidden",
    borderRadius: "6px",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h5,
    color: theme.palette.secondary.light,
    marginBottom: "0.3rem",

    ...theme.typography.h5,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body2,
      lineHeight: "1.8rem",
    },
  };
});

const Content = styled(Typography)(({ theme }) => {
  return {
    textAlign: "justify",
    marginBottom: "0.3rem",

    [theme.breakpoints.down("sm")]: {
      lineHeight: "1.8rem",
    },
  };
});
