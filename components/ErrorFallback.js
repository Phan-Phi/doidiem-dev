import { Container, Typography, styled } from "@mui/material";

import useMedia from "hooks/useMedia";

const Error = ({ error }) => {
  const { isMdDown } = useMedia();

  return (
    <Wrapper>
      <Title variant={isMdDown ? "h6" : "h4"} color="error">
        Hệ thống hiện đã có lỗi, xin vui lòng thử lại sau.
      </Title>
    </Wrapper>
  );
};

export default Error;

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
