import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Box, Stack, styled, Typography, Button } from "@mui/material";

import { Image } from "../../HOC";

const BlogItem = ({ minHeight, setMinHeight, ...props }) => {
  const ref = useRef(null);
  const [titleHeight, setTitleHeight] = useState(32);
  const { id, thumbnail, title, meta, short_des } = props;
  const { first_published_at } = meta;

  useEffect(() => {
    if (ref.current) {
      setMinHeight(ref.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    setTitleHeight((prev) => {
      return Math.max(prev, minHeight);
    });
  }, [minHeight]);

  return (
    <Wrapper>
      <Image
        {...{
          src: thumbnail,
          width: "100%",
          height: "270px",
          objectFit: "cover",
        }}
      />
      <ContentWrapper>
        <Stack spacing={2} alignItems="flex-start">
          <Stack>
            <DateBox>
              <Typography variant="category" fontSize={14}>
                {new Date(first_published_at).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </DateBox>

            <Typography
              ref={ref}
              variant="h5"
              sx={{
                minHeight: titleHeight,
                marginTop: 1.5,
              }}
            >
              {title}
            </Typography>
          </Stack>

          <Box>
            <Typography variant="body2">{short_des}</Typography>
          </Box>
          <Link href={`/tin-tuc/${id}`} passHref>
            <Button
              sx={{
                paddingLeft: 0,
                "&:hover": {
                  opacity: 0.8,
                  backgroundColor: "unset",
                },
              }}
              variant="text"
              disableRipple
            >
              Xem Thêm
            </Button>
          </Link>
        </Stack>
      </ContentWrapper>
    </Wrapper>
  );
};

export default BlogItem;

const Wrapper = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: theme.shadows[2],
    width: "100%",
  };
});

const ContentWrapper = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(2.5),
    position: "relative",
  };
});

const DateBox = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    left: "50%",
    top: "0px",
    padding: "8px 16px",
    borderRadius: 4,
    backgroundColor: "#ffe477",
    transform: "translate(-50%, -50%)",
  };
});
