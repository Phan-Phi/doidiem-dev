import { Fragment } from "react";

import { Box, Typography, useTheme } from "@mui/material";

import truncate from "lodash/truncate";

import useMedia from "../../hooks/useMedia";
import { Image } from "../../HOC";

const CardBrand = ({ data }) => {
  const theme = useTheme();
  const { isSmDown } = useMedia();

  return (
    <Box
      sx={[
        {
          borderRadius: "6px",
          background:
            "linear-gradient(rgba(244, 244, 244, 0.4), rgba(244, 244, 244, 0.2))",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: " 0px 4px 10px rgba(0, 0, 0, 0.15)",
        },
      ]}
    >
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Fragment>
          <Box
            sx={{
              margin: "0 auto",
              overflow: "hidden",
              height: "5rem",
              [theme.breakpoints.up("md")]: {
                transition: "all 0.5s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <Box>
              <Image src={data.image} height="5rem" objectFit="contain" />
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2_bold"
              sx={{
                color: theme.palette.primary.light,
                marginBottom: "8px",
              }}
            >
              {data.is_point_earned === true
                ? `Điểm Tích Luỹ: ${data.point}%`
                : "Không Tích Điểm"}
            </Typography>

            <Typography
              variant="body2"
              sx={{ minHeight: 72, maxHeight: 72, overflow: "hidden" }}
            >
              {truncate(data.description, {
                length: 90,
                separator: " ",
              })}
            </Typography>
          </Box>
        </Fragment>
      </Box>
    </Box>
  );
};

export default CardBrand;
