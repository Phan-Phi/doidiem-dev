import { get } from "lodash";
import { Container, Grid, styled } from "@mui/material";

import SEO from "components/SEO";
import { getSeoObject } from "utils/getSeoObject";
import GuideDetailMenu from "./components/GuideDetailMenu";
import GuideDetailContent from "./components/GuideDetailContent";

export default function GuideDetail({ initData }) {
  if (initData[0].items.length === 0) return null;

  const metaSeo = get(initData[0], "items[0].meta");
  const dataContent = initData[0].items[0].content;

  const dataParent = initData[0].items[0].meta.parent;
  const { title, sections, id } = initData[0].items[0];

  return (
    <StyledContainer>
      <SEO {...getSeoObject(metaSeo)} />

      <Grid container>
        <GridItemMenu item md={3} sm={12}>
          <GuideDetailMenu data={dataParent} />
        </GridItemMenu>

        <GridItem item md={9} sm={12}>
          {sections && (
            <GuideDetailContent
              dataContent={dataContent}
              data={sections}
              title={title}
            />
          )}
        </GridItem>
      </Grid>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: "3rem",
    paddingBottom: "3rem",

    [theme.breakpoints.down("sm")]: {
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
    },
  };
});

const GridItem = styled(Grid)(({ theme }) => {
  return {
    width: "100%",
    borderLeft: "1px solid #eaeaea",
    paddingLeft: "0.8rem",

    [theme.breakpoints.down("sm")]: {
      borderLeft: "none",
      paddingLeft: 0,
      paddingTop: "1.5rem",
    },
  };
});

const GridItemMenu = styled(Grid)(({ theme }) => {
  return {
    width: "100%",
    paddingRight: "0.8rem",
  };
});
