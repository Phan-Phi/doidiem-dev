import { Box, styled } from "@mui/material";
import DOMPurify, { Config } from "isomorphic-dompurify";

export default function RenderHTMLContent(props) {
  const { data, DOMPurifyConfig, ...restProps } = props;

  return (
    <StyledHTML
      {...restProps}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
          ...DOMPurifyConfig,
        }),
      }}
    />
  );
}

const StyledHTML = styled(Box)(({ theme }) => {
  return {
    wordWrap: "break-word",
    display: "flex",
    flexDirection: "column",
    ["& *"]: {
      lineHeight: 1.6,
    },
    ["& ol"]: {
      ...theme.typography.body2,
    },
    ["& ul"]: {
      ...theme.typography.body2,
    },
    ["& li"]: {
      ...theme.typography.body2,
    },
    ["& p"]: {
      ...theme.typography.body2,
      margin: 0,
    },
    ["& a"]: {
      fontSize: "16px",
      lineHeight: "24px",
      color: theme.palette.primary.main,
      ["&:hover"]: {
        color: theme.palette.common.black,
        transition: "color ease 0.4s",
      },
    },
    ["& span"]: {
      ...theme.typography.body2,
    },
    ["& div"]: {
      ...theme.typography.body2,
    },
    ["& .left"]: {
      alignSelf: "flex-start",
    },
    ["& .right"]: {
      alignSelf: "flex-end",
    },
    ["& .text-center"]: {
      alignSelf: "center",
    },

    ["& .full-width"]: {
      width: "100%",
    },
    ["& img"]: {
      maxWidth: "100%",
      objectFit: "contain",
      height: "auto",

      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "auto",
      },
    },
  };
});
