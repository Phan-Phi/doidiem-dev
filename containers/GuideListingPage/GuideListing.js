import useSWR from "swr";
import { get } from "lodash";
import { Container, Grid, styled } from "@mui/material";

import { PAGES } from "apis";
import SEO from "components/SEO";
import { transformUrl } from "libs";
import { getSeoObject } from "utils/getSeoObject";
import GuideListingMenu from "./components/GuideListingMenu";
import GuideListingContent from "./components/GuideListingContent";

export default function GuideListing({ initData }) {
  if (initData[0].items.length === 0) return null;

  const metaSeo = get(initData[0], "items[0].meta");

  const { title, id } = initData[0].items[0];

  const { data: resData } = useSWR(() => {
    return transformUrl(PAGES, {
      fields: "*",
      type: "guide.GuideDetailPage",
      child_of: id,
    });
  });

  return (
    <StyledContainer>
      <SEO {...getSeoObject(metaSeo)} />

      <Grid container>
        <GridItemMenu item md={3} sm={12}>
          <GuideListingMenu data={resData} title={title} />
        </GridItemMenu>

        <GridItem item md={9} sm={12}>
          {resData && <GuideListingContent data={resData} />}
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
