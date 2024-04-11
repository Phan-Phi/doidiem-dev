import { useMeasure } from "react-use";
import { useRouter } from "next/router";
import { useState, useCallback, useMemo, Fragment, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Box,
  Button,
  alpha,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useSetting, useDevice, useGlobal } from "../../hooks";
import { Image } from "../../HOC";
import Link from "../Link";

const Navbar = ({ ...props }) => {
  const theme = useTheme();
  const global = useGlobal();
  const router = useRouter();
  const { isDesktop } = useDevice();
  const [ref, { height }] = useMeasure();
  const { header, logo_header } = useSetting();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    global.set({
      headerHeight: height,
    });
  }, [height]);

  const handleOpenNavMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const navigationHandler = useCallback((type, data) => {
    return (e) => {
      if (type === "by_section") {
        router.push(`/#${data.section}`);
      } else if (type === "by_page") {
        if (data.page.includes("faq")) {
          router.push(`/cau-hoi-thuong-gap`);
        } else if (data.page.includes("home")) {
          router.push("/");
        }
      }
      setAnchorEl(null);
    };
  }, []);

  const children = useMemo(() => {
    if (isDesktop) {
      return (
        <Fragment>
          <Box
            onClick={navigationHandler("by_page", {
              page: "home",
            })}
            sx={{
              cursor: "pointer",
            }}
          >
            <Image width={90} height={90} src={logo_header} />
          </Box>

          <Box
            className="navbar-full"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {header?.slice(0, -1).map((page, index) => {
              const { block_type, value } = page;
              return (
                <Button
                  key={index}
                  disableRipple
                  onClick={navigationHandler(block_type, value)}
                  sx={{
                    "&:hover": {
                      color: alpha(theme.palette.primary.main, 0.8),
                      backgroundColor: "unset",
                    },
                  }}
                >
                  {value.title}
                </Button>
              );
            })}

            <Link href="/dang-ky-quan" passHref>
              <Button variant="contained">Đăng ký</Button>
            </Link>
          </Box>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Box className="nav-bar-anchor">
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={navigationHandler(null)}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
                "& .MuiMenu-paper": {
                  top: "55px !important",
                  left: "55px !important",
                },
              }}
            >
              {header?.slice(0, -1).map((page, index) => {
                const { block_type, value } = page;

                return (
                  <MenuItem
                    key={index}
                    onClick={navigationHandler(block_type, value)}
                  >
                    <Typography textAlign="center">{value.title}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <Box
            onClick={navigationHandler("by_page", {
              page: "home",
            })}
            sx={{
              cursor: "pointer",
            }}
          >
            <Image width={90} height={90} src={logo_header} />
          </Box>
          <Box
            sx={{
              width: "48px",
              height: "48px",
            }}
          />
        </Fragment>
      );
    }
  }, [isDesktop, anchorEl]);

  return (
    <AppBar
      ref={ref}
      position="static"
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
          }}
        >
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

// styled sheet
