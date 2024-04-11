import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Link from "components/Link";
import { Box, Stack, Typography, styled, useTheme } from "@mui/material";

export default function MenuItemForHeader({ value, lastIndex, idx }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <StyledBox>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <WrapperTypography>
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
            {value.title}
          </Typography>

          <WrapperExpandMoreIcon>
            <ExpandMoreIcon />
          </WrapperExpandMoreIcon>
        </WrapperTypography>
      </Link>

      <SubMenu className="SubMenu">
        {value.nested_block.map((el, idx) => {
          if (el.nested_block.length > 0) {
            if (el.link === "") {
              return (
                <MenuItemRight key={idx}>
                  <WrapperExpandSubMenu>
                    <TextItemMenu variant="button2">{el.title}</TextItemMenu>
                    <ExpandMoreIcon />
                  </WrapperExpandSubMenu>

                  <SubMenu2 className="submenu1">
                    {el.nested_block.map((el, idx) => {
                      return (
                        <MenuItem key={idx}>
                          {el.link === "" ? (
                            <TextItemMenu variant="button2">
                              {el.title}
                            </TextItemMenu>
                          ) : (
                            <Link href={el.link}>
                              <TextItemMenu variant="button2">
                                {el.title}
                              </TextItemMenu>
                            </Link>
                          )}
                        </MenuItem>
                      );
                    })}
                  </SubMenu2>
                </MenuItemRight>
              );
            }
          }
          return (
            <MenuItem key={idx}>
              {el.link === "" ? (
                <TextItemMenu variant="button2">{el.title}</TextItemMenu>
              ) : (
                <Link href={el.link}>
                  <TextItemMenu variant="button2">{el.title}</TextItemMenu>
                </Link>
              )}
            </MenuItem>
          );
        })}
      </SubMenu>
    </StyledBox>
  );
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    height: "90px",
    display: "flex",
    alignItems: "center",

    "&:hover .SubMenu": {
      backgroundColor: "white",
      transform: "rotate3d(0,0,0,0deg)",
    },
  };
});

const SubMenu = styled(Stack)(({ theme }) => {
  return {
    width: "max-content",
    position: "absolute",
    top: "100%",
    // zIndex: 1,
    transform: "rotate3d(1,0,0,-90deg)",
    transformOrigin: "0 0 0",
    backgroundColor: theme.palette.common.white,
    transition: "all 0.5s  ease",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  };
});
const MenuItem = styled(Box)(({ theme }) => {
  return {
    padding: "0.8rem",
    width: "auto",
    borderTop: `1px solid ${theme.palette.common.neutral2}`,
  };
});
const TextItemMenu = styled(Typography)(({ theme }) => {
  return {
    display: "block",
    color: theme.palette.common.neutral2,
    textTransform: "uppercase",
    transition: "all 0.4s",
    marginTop: "1px",
    lineHeight: "24px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  };
});

const MenuItemRight = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    width: "auto",
    padding: "0.8rem",
    position: "relative",
    cursor: "pointer",
    borderTop: `1px solid ${theme.palette.common.neutral2}`,

    "&:hover .submenu1": {
      background: theme.palette.common.white,
      transform: "rotate3d(0,0,0,0deg)",
    },
  };
});
const SubMenu2 = styled(Stack)(({ theme }) => {
  return {
    position: "absolute",
    left: "101%",
    top: "-1px",
    background: theme.palette.common.white,
    width: "12rem",
    transform: "rotate3d(0,1,0,-90deg)",
    transformOrigin: "0 0 0",
    transition: "all 0.5s  ease",
    height: "inherit !important",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  };
});

const WrapperTypography = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    "&:hover .MuiSvgIcon-root ": {
      color: theme.palette.primary.light,
      transition: "all 0.5s",
    },

    "&:hover .MuiTypography-root": {
      color: theme.palette.primary.light,
    },
  };
});

const WrapperExpandMoreIcon = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    transition: "all 0.5s",
    "& .MuiSvgIcon-root": {
      color: theme.palette.common.neutral2,
      transform: "rotate(0deg)",
    },
  };
});

const WrapperExpandSubMenu = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      color: theme.palette.common.neutral2,
      transform: "rotate(-90deg)",
      // height: "20px",
    },

    "&:hover .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },

    "&:hover .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
  };
});
