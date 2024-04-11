import useSWR from "swr";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useCallback, useMemo } from "react";

import {
  Box,
  Grid,
  Button,
  useTheme,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { PAGES } from "../../apis";
import { useMedia } from "../../hooks";
import { transformUrl } from "../../libs";
import { ReaderHTML, LineTitle, BannerTop, SEO } from "../../components";
import { getSeoObject } from "utils/getSeoObject";

export default function FaqDetail({ initData }) {
  const [FAQMeta] = initData;
  const theme = useTheme();
  const router = useRouter();

  const [question, setQuestion] = useState();
  const [expanded, setExpanded] = useState();
  const { isMdDown } = useMedia();

  const { data: resData } = useSWR(
    transformUrl(`${PAGES}${router.query.id}`, {})
  );

  useEffect(() => {
    if (resData === undefined) {
      return;
    }
    setQuestion(resData.questions);
  }, [question]);

  const toggleAccordionHandler = useCallback((panel) => {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  });

  if (resData == undefined) {
    return null;
  }
  const { banner } = FAQMeta.items[0];
  const { title, meta } = resData;
  const metaSeo = meta;

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={banner} />
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
            <LineTitle titleData={title} type="center" />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              marginBottom: 5,
            }}
            onClick={() => {
              router.push("/faq");
            }}
          >
            Trở Về
          </Button>

          <Box>
            {resData.questions.map((item, idx) => {
              const { value } = item;
              return (
                <Fragment key={idx}>
                  <Accordion
                    expanded={expanded === idx}
                    onChange={toggleAccordionHandler(idx)}
                    elevation={0}
                    sx={{
                      border: "none",
                      ["&.Mui-expanded"]: {
                        margin: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        margin: 0,
                        padding: 0,
                        paddingY: 1.5,
                        ["&.Mui-expanded"]: {
                          margin: 0,
                        },
                        maxHeight: "64px",
                      }}
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{ color: theme.palette.secondary.main }}
                        />
                      }
                    >
                      <Typography
                        variant="hairline1"
                        sx={{ color: theme.palette.secondary.main }}
                      >
                        {value.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ border: "none", paddingLeft: 0 }}>
                      <ReaderHTML data={{ content: value.answer }} />
                    </AccordionDetails>
                  </Accordion>
                </Fragment>
              );
            })}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
