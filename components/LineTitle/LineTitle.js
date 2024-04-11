import { Fragment } from "react";
import { Box, Stack, styled, Typography, useTheme } from "@mui/material";

import { useMedia } from "../../hooks";

const LineTitle = ({ titleData, subtitleData, type, sx }) => {
  const { isSmDown } = useMedia();
  const theme = useTheme();

  if (type === "right") {
    return (
      <Fragment>
        <Stack
          spacing={4}
          direction="row"
          alignItems="center"
          sx={[
            isSmDown && {
              justifyContent: "center",
            },
          ]}
        >
          <Box
            sx={{
              flexGrow: "1",
              display: isSmDown ? "none" : "block",
            }}
          >
            <Box
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                border: `1px solid ${theme.palette.secondary.main}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  right: 0,
                  zIndex: 1,
                  background: theme.palette.secondary.main,
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
          <Box
            sx={[
              isSmDown && {
                justifyContent: "center",
                marginLeft: "0 !important",
              },
            ]}
          >
            <Typography
              variant={isSmDown ? "h5" : "h4"}
              sx={{ color: theme.palette.secondary.main, textAlign: "center" }}
            >
              {titleData}
            </Typography>
          </Box>
        </Stack>

        {subtitleData && (
          <SubtitleDataRight variant={isSmDown ? "body2" : "body1"}>
            {subtitleData}
          </SubtitleDataRight>
        )}
      </Fragment>
    );
  } else if (type === "left") {
    return (
      <Fragment>
        <Stack
          spacing={4}
          direction="row"
          alignItems="center"
          sx={[
            isSmDown && {
              justifyContent: "center",
            },
          ]}
        >
          <Typography
            variant={isSmDown ? "h5" : "h4"}
            sx={{ color: theme.palette.primary.main }}
          >
            {titleData}
          </Typography>
          <Box sx={{ flexGrow: "1", display: isSmDown ? "none" : "block" }}>
            <Box
              sx={{
                color: theme.palette.primary.main,
                position: "relative",
                border: "1px solid red",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  left: -10,
                  zIndex: 1,
                  background: "red",
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
        </Stack>

        {subtitleData && (
          <SubtitleDataLeft variant={isSmDown ? "body2" : "body1"}>
            {subtitleData}
          </SubtitleDataLeft>
        )}
      </Fragment>
    );
  } else if (type === "center") {
    return (
      <Fragment>
        <Stack
          direction="row"
          alignItems="center"
          sx={[
            isSmDown && {
              justifyContent: "center",
            },
          ]}
        >
          <Box
            sx={[
              { marginRight: "2.5rem", flexGrow: "1" },
              isSmDown && { display: "none" },
            ]}
          >
            <Box
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                border: `1px solid ${theme.palette.secondary.main}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  right: 0,
                  zIndex: 1,
                  background: theme.palette.secondary.main,
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
          <Box>
            <Typography
              variant={isSmDown ? "h5" : "h4"}
              sx={{ color: theme.palette.secondary.main, textAlign: "center" }}
            >
              {titleData}
            </Typography>
          </Box>
          <Box
            sx={[
              { flexGrow: "1", marginLeft: "2.5rem" },
              isSmDown && { display: "none" },
            ]}
          >
            <Box
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                border: `1px solid ${theme.palette.secondary.main}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  left: -10,
                  zIndex: 1,
                  background: theme.palette.secondary.main,
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
        </Stack>

        {subtitleData && (
          <SubtitleDataCenter variant={"body1"}>
            {subtitleData}
          </SubtitleDataCenter>
        )}
      </Fragment>
    );
  }
};

export default LineTitle;

//SubtitleData
const SubtitleDataRight = styled(Typography)(({ theme }) => {
  return {
    marginTop: "1rem",
    color: theme.palette.secondary.light,
    textAlign: "right",
    fontSize: "1.37rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: 0,
      fontSize: "1.1rem",
    },
  };
});

const SubtitleDataLeft = styled(Typography)(({ theme }) => {
  return {
    marginTop: "1rem",
    color: theme.palette.primary.main,
    textAlign: "left",
    fontSize: "1.37rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: 0,
      fontSize: "1.1rem",
    },
  };
});

const SubtitleDataCenter = styled(Typography)(({ theme }) => {
  return {
    marginTop: "1rem",
    color: theme.palette.secondary.light,
    textAlign: "center",
    fontSize: "1.37rem",

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: 0,
      fontSize: "1.1rem",
      lineHeight: "1.6rem",
    },
  };
});
