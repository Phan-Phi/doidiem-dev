import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { green } from "@mui/material/colors";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#EE4F2D",
      light: "#FF8259",
      dark: "#B41100",
    },
    secondary: {
      main: "#1074BA",
      light: "#5BA2ED",
      dark: "#00498A",
    },
    warning: {
      main: "#ffc071",
      dark: "#ffb25e",
    },
    error: {
      main: "#B41100",
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700],
    },
    common: {
      black: "#2B2B2B",
      white: "#FFFFFF",
      neutral1: "#2B2B2B",
      neutral2: "#777E90",
      neutral3: "#B1B5C4",
      neutral4: "#E6E8EC",
      neutral5: "#F4F5F6",
      neutral6: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: "64px",
      lineHeight: "64px",
      fontWeight: 700,
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: "48px",
      lineHeight: "56px",
      fontWeight: 700,
      letterSpacing: "-2%",
    },
    h3: {
      fontSize: "40px",
      lineHeight: "48px",
      fontWeight: 700,
      letterSpacing: "-1%",
    },
    h4: {
      fontSize: "32px",
      lineHeight: "40px",
      fontWeight: 700,
      letterSpacing: "-1%",
    },

    h5: {
      fontSize: "28px",
      lineHeight: "40px",
      fontWeight: 700,
      letterSpacing: "-1%",
    },

    h6: {
      fontSize: "24px",
      lineHeight: "40px",
      fontWeight: 700,
      letterSpacing: "-1%",
    },

    body1: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 400,
      letterSpacing: "-1%",
    },

    body1_bold: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 600,
    },

    body2: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
    },

    body2_bold: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    caption1: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 400,
    },
    caption1_bold: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 500,
    },
    caption2: {
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: 400,
    },
    caption2_bold: {
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: 600,
    },
    hairline1: {
      fontSize: "16px",
      lineHeight: "16px",
      fontWeight: 700,
      textTransform: "uppercase",
    },
    hairline2: {
      fontSize: "12px",
      lineHeight: "12px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    hairline4: {
      fontSize: "32px",
      lineHeight: "40px",
      fontWeight: 400,
      textTransform: "uppercase",
    },
    button1: {
      fontSize: "16px",
      lineHeight: "16px",
      fontWeight: 400,
    },
    button2: {
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: 700,
    },
  },
});

const theme = createTheme({
  ...defaultTheme,
  components: {
    MuiTypography: {
      defaultProps: {
        variant: "body2",
        color: defaultTheme.palette.common.neutral1,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
        },
        outlined: {
          ["& :hover]"]: {},

          ["&.MuiButton-outlinedPrimary:hover"]: {
            backgroundColor: defaultTheme.palette.primary.light,
            color: defaultTheme.palette.common.white,
            borderColor: "transparent",
          },
          ["&.MuiButton-outlinedSecondary:hover"]: {
            backgroundColor: defaultTheme.palette.secondary.light,
            color: defaultTheme.palette.common.white,
            borderColor: "transparent",
          },
        },
      },

      defaultProps: {
        disableRipple: true,
      },
    },

    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
        color: "secondary",
      },
    },

    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          sx: {
            display: "none",
          },
        },
      },

      styleOverrides: {
        root: {
          "& .Mui-selected": {
            backgroundColor: defaultTheme.palette.secondary.light,
            borderRadius: "6px",
            color: `${defaultTheme.palette.common.neutral6} !important`,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          ["& .MuiPagination-ul li .Mui-disabled"]: {
            color: defaultTheme.palette.common.neutral4,
            border: `2px solid ${defaultTheme.palette.common.neutral4}`,
            opacity: 0.7,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          marginLeft: "0.5rem",
          marginRigth: "0.5rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.common.neutral4,
        },
      },
    },

    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },

      styleOverrides: {
        root: {
          ...defaultTheme.typography.caption1,
          padding: "8px 16px",
          color: defaultTheme.palette.common.neutral2,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "secondary",
      },

      styleOverrides: {
        root: {
          ...defaultTheme.typography.caption1,
          color: defaultTheme.palette.common.neutral2,
          borderRadius: "8px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "2rem",

          ["& .MuiOutlinedInput-notchedOutline"]: {
            border: `2px solid ${defaultTheme.palette.common.neutral2}`,
          },
          ["&:hover .MuiOutlinedInput-notchedOutline"]: {
            border: `2px solid ${defaultTheme.palette.common.neutral3}`,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },

      styleOverrides: {
        root: {},
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...defaultTheme.typography.caption1,
          ["&.Mui-focused"]: {
            color: defaultTheme.palette.secondary.main,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ["&.Mui-selected"]: {
            backgroundColor: alpha(defaultTheme.palette.secondary.main, 0.08),
          },
        },
      },
    },
  },
});

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
