import { Fragment } from "react";
import { Container, Box, Grid } from "@mui/material";

import { useMedia } from "../../hooks";
import { ReaderHTML, BannerTop, LineTitle, SEO } from "../../components";
import { getSeoObject } from "utils/getSeoObject";
import { get } from "lodash";

const PolicyPage = ({ initData }) => {
  const [policyData] = initData;
  const { isMdDown } = useMedia();

  const data = policyData.items[0];
  const metaSeo = get(data, "meta");

  return (
    <Fragment>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={data.banner} />

      <Container maxWidth="lg" sx={{ marginBottom: 15 }}>
        <Grid item xs={12}>
          <Box
            sx={[
              {
                paddingTop: 5,
                paddingBottom: 8,
              },
              isMdDown && {
                paddingBottom: 5,
              },
            ]}
          >
            <LineTitle titleData={data.title} type="center" />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <ReaderHTML data={data} />
          </Box>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default PolicyPage;

// styled sheet
