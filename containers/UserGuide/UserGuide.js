import { get } from "lodash";
import { Box, Container, Grid, Typography, styled } from "@mui/material";

import MenuGuide from "./components/MenuGuide";
import ContentGuide from "./components/ContentGuide";
import SEO from "components/SEO";
import { getSeoObject } from "utils/getSeoObject";

export default function UserGuide({ initData }) {
  const metaSeo = get(initData[0], "meta");
  const dataParent = get(initData[0], "meta.parent");

  const { title, sections, id } = initData[0];

  return (
    <StyledContainer>
      <SEO {...getSeoObject(metaSeo)} />

      <Grid container>
        <Grid item md={3} sm={12}>
          <MenuGuide data={dataParent} />
        </Grid>

        <GridItem item md={9} sm={12}>
          <ContentGuide dataTitle={title} dataId={id} dataSections={sections} />
        </GridItem>
      </Grid>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    padding: "3rem 0",
  };
});

const GridItem = styled(Grid)(({ theme }) => {
  return {
    borderLeft: "1px solid #eaeaea",
    paddingLeft: "1rem",
  };
});
