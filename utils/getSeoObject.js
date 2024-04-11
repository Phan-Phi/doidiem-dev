import { TreeItem } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "components/Link";

const getSeoObject = (props) => {
  const title = get(props, "seo_title");
  const description = get(props, "search_description");
  const image = get(props, "og_image");
  const locale = get(props, "locale");

  return {
    title,
    description,
    image,
    locale,
  };
};

const renderBody = (props, dataRouter) => {
  return props.map((el, idx) => {
    if (el.value.sections.length > 0) {
      return (
        <Accordion key={idx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={el.value.title}
            id={el.value.title}
          >
            <Link href={`#${el.value.tag_id}`}>
              <Typography
                sx={{
                  fontWeight: dataRouter.asPath.includes(`#${el.value.tag_id}`)
                    ? 600
                    : 400,
                }}
              >
                {el.value.title}
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            {renderBodyItem(el.value.sections, dataRouter)}
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <Accordion key={idx}>
        <AccordionSummary aria-controls={el.value.title} id={el.value.title}>
          <Link href={`#${el.value.tag_id}`}>
            <Typography>{el.value.title}</Typography>
          </Link>
        </AccordionSummary>
      </Accordion>
    );
  });
};

const renderBodyItem = (props, dataRouter) => {
  return props.map((el, idx) => {
    if (el.sections === undefined) {
      return (
        <Accordion key={idx}>
          <AccordionSummary aria-controls={el.title} id={el.title}>
            <Link href={`#${el.tag_id}`}>
              <Typography>{el.title}</Typography>
            </Link>
          </AccordionSummary>
        </Accordion>
      );
    } else if (el.sections.length > 0) {
      return (
        <Accordion key={idx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={el.title}
            id={el.title}
          >
            <Link href={`#${el.tag_id}`}>
              <Typography>{el.title}</Typography>
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
            <Typography>{el.title}</Typography>
          </Link>
        </AccordionSummary>
      </Accordion>
    );
  });
};

export { getSeoObject, renderBody, renderBodyItem };

// const renderBody = (props, dataRouter) => {
//   return props.map((el) => {
//     if (el.value.sections.length > 0) {
//       return (
//         <TreeItem
//           key={el.value.tag_id}
//           onClick={() => {
//             dataRouter.push(`#${el.value.tag_id}`);
//           }}
//           nodeId={el.value.tag_id}
//           label={el.value.title}
//         >
//           {renderBodyItem(el.value.sections, dataRouter)}
//         </TreeItem>
//       );
//     }

//     return (
//       <TreeItem
//         key={el.value.tag_id}
//         onClick={() => {
//           dataRouter.push(`#${el.value.tag_id}`);
//         }}
//         nodeId={el.value.tag_id}
//         label={el.value.title}
//       />
//     );
//   });
// };

// const renderBodyItem = (props, dataRouter) => {
//   return props.map((el) => {
//     if (el.sections === undefined) {
//       return (
//         <TreeItem
//           key={el.tag_id}
//           onClick={() => {
//             dataRouter.push(`#${el.tag_id}`);
//           }}
//           nodeId={el.tag_id}
//           label={el.title}
//         />
//       );
//     } else if (el.sections.length > 0) {
//       return (
//         <TreeItem
//           key={el.tag_id}
//           onClick={() => {
//             dataRouter.push(`#${el.tag_id}`);
//           }}
//           nodeId={el.tag_id}
//           label={el.title}
//         >
//           {renderBodyItem(el.sections)}
//         </TreeItem>
//       );
//     }

//     return (
//       <TreeItem
//         key={el.tag_id}
//         onClick={() => {
//           dataRouter.push(`#${el.tag_id}`);
//         }}
//         nodeId={el.tag_id}
//         label={el.title}
//       />
//     );
//   });
// };
