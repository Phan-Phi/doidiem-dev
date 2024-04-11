import { Fragment } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Divider,
  Box,
  useTheme,
  Typography,
  Stack,
  styled,
} from "@mui/material";

import { useSetting, useMedia } from "../../hooks";
import { Image } from "../../HOC";
import { Link } from "..";

const FooterContent = dynamic(() => import("./FooterContent"));

const Footer = ({ children, ...props }) => {
  const router = useRouter();
  const { isSmDown, isMdDown, isMdUp } = useMedia();
  const theme = useTheme();
  const setting = useSetting();
  const date = new Date();

  if (!setting) {
    return null;
  }
  const { social_icons } = setting;
  return (
    <Fragment>
      <Box
        id={router.pathname == "/" ? "contact" : "contacts"}
        sx={{
          paddingX: "2rem",
        }}
      >
        <FooterContent setting={setting} />

        <Stack
          flexDirection="row"
          columnGap={3}
          // justifyContent={isMdDown ? "center" : "space-between"}
          justifyContent={isMdDown ? "center" : "center"}
          alignItems={"center"}
          sx={{
            flexWrap: "wrap",
            color: theme.palette.primary.main,
            marginBottom: 3,
            position: "relative",
          }}
        >
          {isMdUp && <Box sx={{ width: "32%", display: "none" }}></Box>}
          <Stack
            flexDirection="row"
            columnGap={3}
            sx={{
              marginLeft: "0 !important",
              marginTop: isMdUp ? "1.1rem" : 0,
            }}
          >
            {social_icons.map((item, idx) => {
              const { value } = item;

              if (value.link) {
                return (
                  <Typography
                    component="a"
                    key={idx}
                    target="_blank"
                    href={value.link}
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        transition: "all 0.5s",
                        "&:hover": {
                          transform: "scale(1.5)",
                        },
                      },
                    }}
                  >
                    <Image
                      {...{
                        src: value.icon,
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  </Typography>
                );
              } else {
                return (
                  <Fragment key={idx}>
                    <Image
                      {...{
                        src: value.icon,
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  </Fragment>
                );
              }
            })}
          </Stack>

          {isMdUp && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: "none",
                width: "32%",
                marginLeft: "0 !important",
              }}
            >
              <Image
                {...{
                  src: "/img/image 6.png",
                  width: "120px",
                  height: "60px",
                }}
              />
              <Image
                {...{
                  src: "/img/image 7.png",
                  width: "120px",
                  height: "60px",
                }}
              />
            </Stack>
          )}
        </Stack>

        {isMdDown && (
          <Stack
            display="none"
            direction="row"
            spacing={1}
            justifyContent="center"
            marginBottom={3}
          >
            <Image
              {...{
                src: "/img/image 6.png",
                width: "120px",
                height: "60px",
              }}
            />
            <Image
              {...{
                src: "/img/image 7.png",
                width: "120px",
                height: "60px",
              }}
            />
          </Stack>
        )}
      </Box>

      <Box
        sx={[
          {
            width: "100%",
          },
        ]}
      >
        <Divider
          sx={[
            {
              width: "60vw",
              marginX: "auto",
            },
            isSmDown && {
              width: "100%",
            },
          ]}
        />
        <Stack direction={"column"}>
          <Typography
            variant="hairline2"
            sx={{
              paddingTop: 4,
              paddingBottom: 2,
              display: "block",
              textAlign: "center",
              color: theme.palette.common.neutral2,
              textTransform: "uppercase",
            }}
          >
            Copyright © {date.getFullYear()} Đổi Điểm. All rights reserved
          </Typography>

          <Stack direction={"row"} justifyContent="center" spacing={0.5}>
            <Typography
              variant="hairline2"
              sx={{
                paddingBottom: 4,
                display: "block",
                textAlign: "center",
                color: theme.palette.common.neutral2,
                textTransform: "uppercase",
              }}
            >
              Powered by
            </Typography>

            <Link href="https://t-solution.vn/vi/" target="_blank">
              <Text
                variant="hairline2"
                sx={{
                  paddingBottom: 4,
                  display: "block",
                  textAlign: "center",
                  color: theme.palette.common.neutral2,
                  textTransform: "uppercase",
                }}
              >
                T-Solution
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default Footer;

const Text = styled(Typography)(({ theme }) => {
  return {
    paddingBottom: 4,
    display: "block",
    textAlign: "center",
    color: theme.palette.common.neutral2,
    textTransform: "uppercase",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  };
});
