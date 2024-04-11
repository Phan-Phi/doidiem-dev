import DOMPurify from "isomorphic-dompurify";
import { Fragment } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";

const FaqDetail = ({ data }) => {
  if (data === null) {
    return null;
  }

  const questions = data.questions;

  return (
    <Fragment>
      {questions.map((el) => {
        const {
          value: { answer, question },
        } = el;

        return (
          <Accordion
            sx={{
              marginBottom: 2,

              "&:before": {
                display: "none",
              },
            }}
            disableGutters
            elevation="0"
          >
            <AccordionSummary
              sx={{
                backgroundColor: "rgb(249, 243, 255)",
              }}
              expandIcon={<ExpandMore />}
              id="panel1a-header"
            >
              <Typography>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(answer),
                }}
              ></div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Fragment>
  );
};

export default FaqDetail;
