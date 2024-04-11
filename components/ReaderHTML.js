import { Box } from "@mui/material";
import { extract } from "oembed-parser";
import DOMPurify from "isomorphic-dompurify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const renderHTML = ({ data, sx = {}, containerWidth, ...props }) => {
  const router = useRouter();

  let { content } = data;

  const [transformedBody, setTransformedBody] = useState(() => {
    if (!content) {
      return undefined;
    }

    return content;
  });

  useEffect(() => {
    (async () => {
      if (content == undefined || typeof content == "string") {
        return;
      }

      const result = await Promise.all(
        content.map(async (el) => {
          const { block_type, isParsed, value } = el;

          if (block_type === "embed") {
            if (isParsed) {
              return el;
            }

            const parsedData = await extract(value.src).then((oembed) => {
              if (oembed === null) {
                return {
                  ...el,
                  isParsed: false,
                };
              }

              const { html } = oembed;

              return {
                ...el,
                html,
                isParsed: true,
              };
            });

            return parsedData;
          } else {
            return el;
          }
        })
      );

      setTransformedBody(result);
    })();
  }, [content]);

  if (typeof content === "string") {
    return (
      <Box
        sx={[
          {
            wordWrap: "break-word",
            fontSize: router.pathname === "/" ? "auto" : "16px",
            ["& *"]: {
              marginBottom: "0.75rem",
              lineHeight: router.pathname === "/" ? 1.2 : 1.6,
            },
            ["& ol"]: {
              marginLeft: "1rem",
            },
            ["& ul"]: {
              marginLeft: "1.25rem",
            },
            ["& img"]: {
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              objectFit: "contain",
            },
          },
          sx,
        ]}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content, {}),
        }}
      ></Box>
    );
  }

  return transformedBody.map((el, i) => {
    const { block_type, value } = el;
    if (block_type === "content") {
      return (
        <Box
          key={i}
          sx={[
            {
              wordWrap: "break-word",
              fontSize: "16px",
              ["& *"]: {
                marginBottom: "0.75rem",
                lineHeight: 1.6,
              },
              ["& ol"]: {
                marginLeft: "1rem",
              },
              ["& ul"]: {
                marginLeft: "1.25rem",
              },
              ["& img"]: {
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
              },
              // ["& h6"]: {
              //   fontWeight: 400,
              //   fontStyle: "italic",
              //   fontSize: "0.875rem",
              //   paddingBottom: "0.5rem",
              // },
            },
            sx,
          ]}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(value, {
              ADD_TAGS: ["iframe"],
              ADD_ATTR: [
                "allow",
                "allowfullscreen",
                "frameborder",
                "scrolling",
              ],
            }),
          }}
          {...props}
        ></Box>
      );
    } else if (block_type === "embed") {
      const { width, height } = value;

      if (el.html) {
        return (
          <Box
            key={i}
            sx={{
              ["& iframe"]: {
                width: `${width}px`,
                height: `${height}px`,
                maxWidth: `${containerWidth}px`,
                maxHeight: `${(containerWidth * height) / width}px`,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(el.html, {
                ADD_TAGS: ["iframe"],
                ADD_ATTR: [
                  "allow",
                  "allowfullscreen",
                  "frameborder",
                  "scrolling",
                ],
              }),
            }}
          ></Box>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  });
};

export default renderHTML;
