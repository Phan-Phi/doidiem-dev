import { useCallback } from "react";
import { useRouter } from "next/router";
import { Button, Grid, Box, useTheme, styled } from "@mui/material";

import Link from "../../../components/Link";
import CardItem from "../../../components/Card/CardItem";

import { LineTitle, Container } from "../../../components";

export default function HomeNews({ data, blogHomeData }) {
  const { blog_title } = data;
  const router = useRouter();

  const handleDetailNew = useCallback((id) => {
    router.push(`/tin-tuc/${id}`);
  }, []);

  return (
    <WrapperContainer
      // id="blog"
      maxWidth="lg"
    >
      <WrapperLineTitle>
        <LineTitle titleData={blog_title} type="right" />
      </WrapperLineTitle>

      <Grid container columnSpacing={6} rowSpacing={4}>
        {blogHomeData.map((data, idx) => {
          return (
            <Grid
              onClick={() => handleDetailNew(data.id)}
              key={idx}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <CardItem data={data} />
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <WrapperButton>
            <Link href="/tin-tuc" sx={{ textDecoration: "none" }}>
              <Button variant="outlined" color="secondary">
                XEM THÊM
              </Button>
            </Link>
          </WrapperButton>
        </Grid>
      </Grid>
    </WrapperContainer>
  );
}

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    paddingBottom: "5rem",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "3rem",
    },
  };
});

const WrapperLineTitle = styled(Box)(({ theme }) => {
  return {
    paddingTop: "4rem",
    paddingBottom: "1.7rem",

    [theme.breakpoints.down("md")]: {
      paddingTop: "2.5rem",
      paddingBottom: "2.5rem",
    },
  };
});

const WrapperButton = styled(Box)(({ theme }) => {
  return {
    textAlign: "center",
  };
});
