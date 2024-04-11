import truncate from "lodash/truncate";
import { useState, Fragment } from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { useMeasure, useUpdateEffect } from "react-use";
import { format, parseISO } from "date-fns";

import { Image } from "../../HOC";

const TITLE_HEIGHT = 48;
const DESCRIPTION_HEIGHT = 72;

const CardItem = ({ data }) => {
  const theme = useTheme();

  const [ref, { width, height }] = useMeasure();

  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });

  useUpdateEffect(() => {
    setImageSize({
      width,
      height: (width * 9) / 16,
    });
  }, [width]);

  return (
    <Box
      className="slider-wrapper"
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
        [theme.breakpoints.up("md")]: {
          transition: "all 0.5s",
          "&:hover": {
            transform: "translateY(-20px)",
          },

          "&:hover .changeBorder": {
            borderColor: theme.palette.secondary.main,
          },
        },
      }}
    >
      <Box
        className="changeBorder"
        ref={ref}
        sx={{
          borderRadius: "8px",
          background:
            "linear-gradient(rgba(244, 244, 244, 0.4), rgba(244, 244, 244, 0.2))",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(177, 181, 195, 0.1)",
          padding: 1.5,
        }}
      >
        <Fragment>
          <Box
            sx={{
              overflow: "hidden",
              borderRadius: "6px",
            }}
          >
            <Image
              src={data.thumbnail ? data.thumbnail : "/img/Rectangle 5.jpg"}
              width={"100%"}
              height={imageSize?.height}
              objectFit="cover"
            />
          </Box>

          <Stack
            sx={{
              marginTop: 1,
              cursor: "pointer",
            }}
          >
            <Typography
              variant="body2_bold"
              sx={{
                color: theme.palette.secondary.main,
                marginBottom: "8px",
                minHeight: `${TITLE_HEIGHT}px`,
                maxHeight: `${TITLE_HEIGHT}px`,
              }}
            >
              {truncate(data.title, {
                length: 60,
                separator: " ",
              })}
            </Typography>

            <Typography
              variant="caption2"
              sx={{
                marginBottom: "8px",
                color: theme.palette.secondary.light,
              }}
            >
              {format(parseISO(data.last_published_at), "dd/MM/yyyy")}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                minHeight: `${DESCRIPTION_HEIGHT}px`,
                maxHeight: `${DESCRIPTION_HEIGHT}px`,
                color: theme.palette.common.neutral2,
                overflow: "hidden",
              }}
            >
              {truncate(data.short_description, {
                length: 90,
                separator: " ",
              })}
            </Typography>
          </Stack>
        </Fragment>
      </Box>
    </Box>
  );
};

export default CardItem;
