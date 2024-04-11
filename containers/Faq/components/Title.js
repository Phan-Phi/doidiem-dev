import { Box, Typography } from "@mui/material";

export default ({ data }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h1" marginBottom={2}>
        {data.title}
      </Typography>
      <Typography variant="h3">{data.subtitle}</Typography>
    </Box>
  );
};
