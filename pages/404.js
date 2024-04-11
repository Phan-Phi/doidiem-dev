import { Container, Typography, styled } from "@mui/material";

import useMedia from "hooks/useMedia";

const _404Page = () => {
  const { isMdDown } = useMedia();

  return (
    <Wrapper>
      <Title variant={isMdDown ? "h6" : "h4"} color="error">
        Trang bạn tìm kiếm không tồn tại.
      </Title>
    </Wrapper>
  );
};

export default _404Page;

const Wrapper = styled(Container)(({ theme }) => {
  return {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});
const Title = styled(Typography)(({ theme }) => {
  return {
    textAlign: "center",
    color: theme.palette.primary.main,
  };
});
