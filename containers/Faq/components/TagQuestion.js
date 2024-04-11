import React from "react";

export default function TagQuestion(data) {
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      sx={{ border: "none" }}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
        sx={{
          flexDirection: "row",
          padding: 0,
          background: "none",
          "& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root": {
            color: theme.palette.secondary.main,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
      >
        <Typography
          variant="hairline1"
          sx={{ color: theme.palette.secondary.main }}
        >
          Collapsible Group Item #1
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ border: "none", paddingLeft: 0 }}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
