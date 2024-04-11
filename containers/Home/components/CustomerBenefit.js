import {
  Grid,
  Typography,
  Container,
  useTheme,
  Stack,
  Box,
  styled,
} from "@mui/material";
import { useMeasure } from "react-use";

import { Image } from "../../../HOC";
import useMedia from "../../../hooks/useMedia";
import LineTitle from "../../../components/LineTitle/LineTitle";
import EndPointScroll from "components/EndPointScroll";

//

const RATIO = 540 / 310;

const HomeBenefit = ({ data, ...props }) => {
  const [ref, { width }] = useMeasure();
  const {
    customer_title,
    customer_subtitle,
    customer_content,
    customer_image,
  } = data;
  const { isMdDown, isSmDown } = useMedia();
  const theme = useTheme();

  return (
    <WrapperContainer maxWidth="lg" ref={ref}>
      <WrapperLineTitle>
        <LineTitle
          titleData={customer_title}
          subtitleData={customer_subtitle}
          type="right"
        />
      </WrapperLineTitle>

      <GridContainer container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Image
            src={customer_image}
            width={"100%"}
            height={isMdDown ? width * RATIO : "100%"}
            objectFit="contain"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            sx={[
              {
                paddingRight: 10,
                paddingY: 10,
              },
              isMdDown && {
                paddingRight: 0,
                paddingY: 0,
                paddingTop: 5,
              },
            ]}
            spacing={3}
          >
            {customer_content.map((item, idx) => {
              return (
                <Stack flexDirection={"row"} alignItems="center" key={idx}>
                  <Box
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        transition: "all 0.5s",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      },
                    }}
                  >
                    <Image
                      src={item.value.icon}
                      width="120px"
                      height="120px"
                      objectFit="contain"
                    />
                  </Box>

                  <Stack
                    sx={{
                      paddingLeft: 2,
                    }}
                  >
                    <Title variant={isSmDown ? "h6" : "h5"}>
                      {item.value.title}
                    </Title>

                    <Typography variant="body2">
                      {item.value.description}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
      </GridContainer>
      {/* <Box id="partner"></Box> */}

      {/* <EndPointScroll
        name="partner"
        numberMd={4}
        numberXl={5.5}
        numberSm={4.5}
      /> */}
    </WrapperContainer>
  );
};

export default HomeBenefit;

const Title = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.secondary.light,
    marginBottom: "0.3rem",

    [theme.breakpoints.down("sm")]: {
      lineHeight: "1.8rem",
    },
  };
});

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    paddingBottom: "3rem",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "2rem",
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

const GridContainer = styled(Grid)(({ theme }) => {
  return {
    borderRadius: "1rem",
    border: "2px solid rgba(177, 181, 195, 0.1)",
    backgroundColor: "rgba(244, 244, 244, 0.6)",

    [theme.breakpoints.down("md")]: {
      background: "none",
      border: "none",
    },
  };
});
