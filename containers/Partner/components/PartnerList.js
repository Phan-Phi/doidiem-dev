import { Typography, Grid, Box, Fade } from "@mui/material";

import PartnerListItem from "./PartnerListItem";

const PartnerList = ({ data, ...props }) => {
  if (data === null) {
    return null;
  }

  return (
    <Fade
      in={true}
      timeout={{
        enter: 700,
      }}
    >
      <Box {...props}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="span"
                sx={{
                  textAlign: "center",
                  fontSize: 48,
                  fontWeight: 700,
                  background:
                    "linear-gradient(to left, #F6CB18 0%, #F6CB18 100%)",
                  backgroundSize: "100% 26px",
                  backgroundPosition: "0px calc(100% - 0px)",
                  backgroundRepeat: "repeat-x",
                }}
              >
                {data.title}
              </Typography>
            </Box>
          </Grid>
          {data.partners.map((el, idx) => {
            return (
              <Grid item xs={12} md={6} key={idx}>
                <PartnerListItem data={el} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Fade>
  );
};

export default PartnerList;

{
  /* <div
dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(answer),
}}
></div> */
}
