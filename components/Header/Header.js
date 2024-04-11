import { set } from "lodash";
import { scroller } from "react-scroll";
import { useRouter } from "next/router";
import cloneDeep from "lodash/cloneDeep";
import { useWindowScroll, useToggle, useMeasure } from "react-use";
import { useEffect, useState, Fragment, useMemo } from "react";
import {
  AppBar,
  Box,
  Typography,
  useTheme,
  Stack,
  Fade,
  styled,
} from "@mui/material";

import Link from "../Link";
import { Image } from "../../HOC";
import ModalMenu from "./ModalMenu";
import Container from "../Container";
import HamburgerIcon from "../HamburgerIcon";
import { useSetting, useMedia } from "../../hooks";

import MenuItemForHeader from "./components/MenuItemForHeader";
import MenuItemForHeaderApp from "./components/MenuItemForHeaderApp";

const objLogo = {
  block_type: "by_link",
  value: {
    title: "Logo",
    img: "",
    link: "/",
  },
};

const Header = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  const setting = useSetting();
  const { isMdUp } = useMedia();
  const { y } = useWindowScroll();
  const [ref, { height }] = useMeasure();
  const [isToggle, setIsToggle] = useToggle(false);

  const [animationState, setAnimationState] = useState(false);

  useEffect(() => {
    if (y > 800 && !animationState) {
      setAnimationState(true);
    }

    if (y < 500 && animationState) {
      setAnimationState(false);
    }
  }, [y, animationState]);

  useEffect(() => {
    if (isMdUp) {
      setIsToggle(false);
    }
  }, [isMdUp]);

  const scrollTo = (target) => {
    scroller.scrollTo(target, {
      duration: 2000,
      delay: 0,
      smooth: "easeInQuad",
    });
  };

  const transformedNavigation = useMemo(() => {
    if (setting == undefined) {
      return null;
    }

    const updateobjLogo = set(objLogo, "value.img", setting.logo_header);

    const cloneSettingData = cloneDeep(setting?.header);
    cloneSettingData?.splice(3, 0, updateobjLogo);

    return cloneSettingData;
  }, [setting]);

  const Navbar = useMemo(() => {
    if (setting == undefined || transformedNavigation == undefined) {
      return;
    }

    let data = setting.header;

    if (transformedNavigation && isMdUp) {
      data = transformedNavigation;
    }

    const lastIndex = data.length - 1;

    return (
      <Container
        maxWidth="lg"
        sx={[
          { overflow: "visible" },
          !isMdUp && {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
          },
        ]}
      >
        <Stack
          direction={isMdUp ? "row" : "column"}
          spacing={isMdUp ? 3 : 2}
          sx={[
            {
              justifyContent: "space-between",
              alignItems: "center",

              "& .navLink:last-child": {
                backgroundColor: theme.palette.primary.main,
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                color: "white",
                transition: "all 0.5s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              },
            },
            !isMdUp && {
              alignItems: "flex-start",
            },
          ]}
        >
          {data.map((el, idx) => {
            const { block_type, value } = el;

            if (value.title === "Logo") {
              return (
                <Box key={idx}>
                  <Link href="/">
                    <Image
                      src={el.value.img}
                      width="90px"
                      height="90px"
                      objectFit="contain"
                    />
                  </Link>
                </Box>
              );
            }

            if (value.nested_block !== undefined) {
              if (value.nested_block.length > 0) {
                if (isMdUp) {
                  return (
                    <MenuItemForHeader
                      value={value}
                      lastIndex={lastIndex}
                      idx={idx}
                      key={idx}
                    />
                  );
                }
                return <MenuItemForHeaderApp value={value} key={idx} />;
              }
            }

            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: isMdUp ? height : null,
                }}
              >
                <Link
                  key={idx}
                  href={
                    block_type === "by_section"
                      ? `#${value.section}`
                      : value.link
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    const link =
                      block_type === "by_section"
                        ? `/#${value.section}`
                        : value.link;

                    scrollTo(value.section);
                    router.push(link);

                    setIsToggle(false);
                  }}
                  sx={{
                    transition: "all 0.5s",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="button2"
                      sx={[
                        {
                          textTransform: "uppercase",
                          color:
                            `/#${value.section}` === router.asPath ||
                            `/${value.section}?` === `${router.asPath}?`
                              ? theme.palette.primary.light
                              : theme.palette.common.neutral2,
                          transition: "all 0.5s",
                          "&:hover": {
                            color: theme.palette.primary.light,
                          },
                        },
                        lastIndex === idx && {
                          backgroundColor: "primary.main",
                          paddingY: 1,
                          paddingX: 2,
                          borderRadius: 1.5,
                          color: "common.white",
                          ["&:hover"]: {
                            backgroundColor: "primary.light",
                            color: "common.white",
                          },
                        },
                      ]}
                    >
                      {el.value.title}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Stack>
      </Container>
    );
  }, [transformedNavigation, isMdUp, setting, router, height]);

  const staticNav = useMemo(() => {
    if (y > 900) {
      return (
        <AppBar
          sx={{
            overflow: "initial",
            position: "fixed",
            backgroundColor: "white",
            top: 0,
            boxShadow: " 0px 2px 20px 0 rgba(0, 0, 0, 0.3)",
          }}
          elevation={0}
        >
          {Navbar}
        </AppBar>
      );
    }

    return null;
  }, [y, Navbar]);

  const NavbarMemo = useMemo(() => {
    if (!setting) {
      return null;
    }

    if (isMdUp) {
      return (
        <Fragment>
          {Navbar}
          <Fade
            in={animationState}
            mountOnEnter
            unmountOnExit
            timeout={{
              enter: 1000,
              exit: 100,
            }}
          >
            <AppBar
              sx={{
                position: "fixed",
                backgroundColor: theme.palette.common.white,
              }}
            >
              {staticNav}
            </AppBar>
          </Fade>
        </Fragment>
      );
    } else {
      const TopNav = (
        <Stack
          sx={{ background: "white" }}
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href="/"
            onClick={() => {
              setIsToggle(false);
            }}
          >
            <Image src={setting.logo_header} width="70px" height="70px" />
          </Link>

          <HamburgerIcon
            onClick={() => {
              setIsToggle(!isToggle);
            }}
            className={isToggle && "open"}
          />
        </Stack>
      );

      return (
        <Fragment>
          <Container sx={{ zIndex: 10, position: "static", top: 0, left: 0 }}>
            {TopNav}
          </Container>

          <Fade
            in={animationState}
            mountOnEnter
            unmountOnExit
            timeout={{
              enter: 300,
              exit: 150,
            }}
          >
            <AppBar
              sx={{
                position: "fixed",
                backgroundColor: theme.palette.common.white,
                paddingX: "32px",
              }}
            >
              {TopNav}
            </AppBar>
          </Fade>

          <ModalMenu open={isToggle} toggle={setIsToggle}>
            <Container>
              {TopNav}

              <Box
                sx={{
                  marginY: 4,
                }}
              >
                {Navbar}
              </Box>

              <Stack
                direction="row"
                spacing={3}
                sx={{
                  paddingBottom: 1,
                }}
              >
                <Link target="_blank" href={setting.android_customer}>
                  <Image
                    {...{
                      src: "/icon_gg.png",
                      width: "120px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />
                </Link>

                <Link target="_blank" href={setting.ios_customer}>
                  <Image
                    {...{
                      src: "/icon_apple.png",
                      width: "120px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </Stack>
            </Container>
          </ModalMenu>
        </Fragment>
      );
    }
  }, [isMdUp, animationState, Navbar, staticNav, isToggle]);

  if (!setting) {
    return null;
  }

  return (
    <Box
      ref={ref}
      sx={{
        overflow: "visible",
        background: "white",
        width: "100%",
        boxShadow: " 0px 2px 20px 0 rgba(0, 0, 0, 0.3)",
        zIndex: 10,
      }}
    >
      {NavbarMemo}
    </Box>
  );
};
export default Header;
