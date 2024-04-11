import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import Link from "components/Link";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MenuItemForHeaderApp({ value }) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={value.title}
        id={value.title}
      >
        <Link href={`#${value.tag_id}`}>
          <Box sx={{ display: "flex" }}>
            <Title variant="button2">{value.title}</Title>
          </Box>
        </Link>
      </AccordionSummary>

      <AccordionDetails>
        {value.nested_block.map((el, idx) => {
          if (el.nested_block.length > 0) {
            if (el.link === "") {
              return (
                <Accordion key={idx}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={el.title}
                    id={el.title}
                  >
                    <Title variant="button2">{el.title}</Title>
                  </AccordionSummary>
                  <AccordionDetails>
                    {el.nested_block.map((el, idx) => {
                      return (
                        <Link href={`${el.link}`} key={idx}>
                          <TitleAccordion
                            sx={{
                              color: theme.palette.common.neutral2,
                            }}
                            variant="button2"
                          >
                            {el.title}
                          </TitleAccordion>
                        </Link>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              );
            }
          }
          return (
            <Link href={`${el.link}`} key={idx}>
              <TitleAccordion
                variant="button2"
                sx={{
                  color:
                    router.asPath === "/faq"
                      ? theme.palette.primary.main
                      : "#777E90",
                }}
              >
                {el.title}
              </TitleAccordion>
            </Link>
          );
        })}
      </AccordionDetails>
    </StyledAccordion>
  );
}

const StyledAccordion = styled(Accordion)(({ theme }) => {
  return {
    width: "100%",
    background: "none",
    boxShadow: "none",
    marginBottom: "0 !important",

    "&:before": {
      display: "none !important",
    },

    "& .MuiPaper-root:before": {
      display: "none",
    },

    "& .MuiButtonBase-root": {
      minHeight: "auto !important",
      margin: 0,
      padding: 0,
      height: "1rem",
    },

    "& .Mui-expanded": {
      minHeight: "auto !important",
      margin: 0,
    },
    "& .MuiAccordionSummary-content": {
      margin: 0,
      minHeight: "auto !important",
    },

    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: 0,
      minHeight: "auto !important",
    },

    "& .Mui-expanded:before": {
      display: "none !important",
    },

    "& .MuiPaper-root": {
      background: "none",
      boxShadow: "none",
      "& .MuiCollapse-root": {
        "& .MuiAccordionDetails-root": {
          "& .MuiTypography-root:last-child": {
            marginBottom: 0,
          },
        },
      },
    },

    "& .MuiAccordionDetails-root": {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    textTransform: "uppercase !important",
    color: "#777E90",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  };
});

const TitleAccordion = styled(Typography)(({ theme }) => {
  return {
    width: "fit-content",
    display: "block",
    margin: "1rem 0",
    textTransform: "uppercase !important",

    "&:hover": {
      color: theme.palette.primary.light,
    },
  };
});
