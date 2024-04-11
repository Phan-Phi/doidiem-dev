import useSWR from "swr";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import { PAGES } from "apis";
import Link from "components/Link";
import { transformUrl } from "libs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { renderBodyItem } from "utils/getSeoObject";
// import { renderBody } from "utils/getSeoObject";

export default function MenuGuide3({ data }) {
  const router = useRouter();
  const theme = useTheme();

  const [expanded, setExpanded] = useState("panel1");

  const { id, title } = data;

  const { data: resData } = useSWR(() => {
    return transformUrl(PAGES, {
      fields: "*",
      type: "guide.GuideDetailPage",
      child_of: id,
    });
  });

  const renderBody = useCallback(
    (props) => {
      return props.map((el, idx) => {
        if (el.value.sections.length > 0) {
          return (
            <Accordion key={idx}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color:
                        expanded === el.value.tag_id
                          ? theme.palette.primary.main
                          : theme.palette.common.black,
                    }}
                  />
                }
                aria-controls={el.value.title}
                id={el.value.title}
              >
                <Link href={`#${el.value.tag_id}`}>
                  <Typography
                    onClick={() => {
                      setExpanded(el.value.tag_id);
                    }}
                    sx={{
                      fontWeight: expanded === el.value.tag_id ? 600 : 400,
                      color:
                        expanded === el.value.tag_id
                          ? theme.palette.primary.main
                          : theme.palette.common.black,
                    }}
                  >
                    {el.value.title}
                  </Typography>
                </Link>
              </AccordionSummary>
              <AccordionDetails>
                {renderBodyItem(el.value.sections)}
              </AccordionDetails>
            </Accordion>
          );
        }

        return (
          <Accordion key={idx}>
            <AccordionSummary
              aria-controls={el.value.title}
              id={el.value.title}
            >
              <Link href={`#${el.value.tag_id}`}>
                <Typography
                  onClick={() => {
                    setExpanded(el.value.tag_id);
                  }}
                  sx={{
                    fontWeight: expanded === el.value.tag_id ? 600 : 400,
                    color:
                      expanded === el.value.tag_id
                        ? theme.palette.primary.main
                        : theme.palette.common.black,
                  }}
                >
                  {el.value.title}
                </Typography>
              </Link>
            </AccordionSummary>
          </Accordion>
        );
      });
    },
    [expanded]
  );

  const renderBodyItem = useCallback(
    (props) => {
      return props.map((el, idx) => {
        if (el.sections === undefined) {
          return (
            <Accordion key={idx}>
              <AccordionSummary aria-controls={el.title} id={el.title}>
                <Link href={`#${el.tag_id}`}>
                  <Typography
                    onClick={() => {
                      setExpanded(el.tag_id);
                    }}
                    sx={{
                      fontWeight: expanded === el.tag_id ? 600 : 400,
                      color:
                        expanded === el.tag_id
                          ? theme.palette.primary.main
                          : theme.palette.common.black,
                    }}
                  >
                    {el.title}
                  </Typography>
                </Link>
              </AccordionSummary>
            </Accordion>
          );
        } else if (el.sections.length > 0) {
          return (
            <Accordion key={idx}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color:
                        expanded === el.tag_id
                          ? theme.palette.primary.main
                          : theme.palette.common.black,
                    }}
                  />
                }
                aria-controls={el.title}
                id={el.title}
              >
                <Link href={`#${el.tag_id}`}>
                  <Typography
                    onClick={() => {
                      setExpanded(el.tag_id);
                    }}
                    sx={{
                      fontWeight: expanded === el.tag_id ? 600 : 400,
                      color:
                        expanded === el.tag_id
                          ? theme.palette.primary.main
                          : theme.palette.common.black,
                    }}
                  >
                    {el.title}
                  </Typography>
                </Link>
              </AccordionSummary>
              <AccordionDetails>{renderBodyItem(el.sections)}</AccordionDetails>
            </Accordion>
          );
        }

        return (
          <Accordion key={idx}>
            <AccordionSummary aria-controls={el.title} id={el.title}>
              <Link href={`#${el.tag_id}`}>
                <Typography
                  onClick={() => {
                    setExpanded(el.tag_id);
                  }}
                  sx={{
                    fontWeight: expanded === el.tag_id ? 600 : 400,
                    color:
                      expanded === el.tag_id
                        ? theme.palette.primary.main
                        : theme.palette.common.black,
                  }}
                >
                  {el.title}
                </Typography>
              </Link>
            </AccordionSummary>
          </Accordion>
        );
      });
    },
    [expanded]
  );

  const renderItem = useMemo(() => {
    if (resData == undefined) return;
    return resData.items.map((el, idx) => {
      if (el.meta.slug === router.query.slug) {
        return (
          <Accordion key={idx} expanded={true}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />
              }
              aria-controls={el.title}
              id={el.title}
            >
              <Typography
                sx={{ fontWeight: 600, color: theme.palette.primary.main }}
              >
                {el.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{renderBody(el.sections)}</AccordionDetails>
          </Accordion>
        );
      }
      return (
        <TitleAccordion
          key={idx}
          onClick={() => {
            router.push(`/huong-dan-su-dung/${el.meta.slug}`);
          }}
        >
          {el.title}
        </TitleAccordion>
      );
    });
  }, [resData, router.query.slug, expanded]);

  return (
    <Wrapper>
      <Title>{title}</Title>

      {renderItem}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    //Accordion
    "& .MuiPaper-root": {
      backgroundColor: "none",
      boxShadow: "none !important",

      "& .MuiAccordionDetails-root": {
        borderLeft: "1px solid black",
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
      },

      "& .MuiButtonBase-root": {
        minHeight: "auto !important",
        margin: 0,
        padding: 0,
      },

      "& .Mui-expanded": {
        minHeight: "auto !important",
        margin: 0,
      },

      "& .MuiAccordionSummary-content": {
        margin: "0.3rem 0",
        minHeight: "auto !important",
      },
    },

    "& .MuiPaper-root:before": {
      display: "none",
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h6,
    marginBottom: "1rem",
  };
});

const TitleAccordion = styled(Typography)(({ theme }) => {
  return {
    margin: "1rem 0",
  };
});
