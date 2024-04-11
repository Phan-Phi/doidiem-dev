import { Box, useTheme } from "@mui/material";

const Wrapper = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        [theme.breakpoints.down("sm")]: {
          paddingY: 4,
        },
        [theme.breakpoints.up("sm")]: {
          paddingY: 6,
        },
        [theme.breakpoints.up("lg")]: {
          paddingY: 8,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
