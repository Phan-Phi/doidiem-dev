import { Box } from "@mui/material";

export default function TabPanel(props) {
  const { children, value, index } = props;
  return value === index ? <Box id={index}>{children}</Box> : null;
}
