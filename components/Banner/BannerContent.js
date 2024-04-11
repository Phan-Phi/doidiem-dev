import { Button, Box, styled, Container, Typography } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

import { Image } from "HOC";
import { useRouter } from "next/router";

export default function BannerContent({ titleButton = "", background, title }) {
  const { push } = useRouter();

  return (
    <Wrapper>
      <Container>
        <Title>CHINH PHỤC KHÁCH HÀNG DỄ HƠN BAO GIỜ HẾT!</Title>
        <Btn variant="contained" onClick={() => push("/dang-ky")}>
          Bắt Đầu Ngay!
        </Btn>
      </Container>

      <WrapperImage>
        <Image
          src="/img/Rectangle 5.jpg"
          height={"100%"}
          width="100%"
          objectFit="cover"
        />
      </WrapperImage>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  return {
    position: "relative",

    textAlign: "center",

    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "6.6rem 0",

    marginBottom: "2rem",
    [theme.breakpoints.down("md")]: {},
  };
});

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    // margin: 0,
    padding: "6.6rem",
    backgroundImage: "url('/img/Rectangle 5.jpg')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      paddingBottom: "3rem",
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    paddingBottom: "1.5rem",

    fontSize: "2.5rem",
    lineHeight: "48.41px",
    fontWeight: 700,

    color: "white",

    WebkitTextStrokeWidth: "2px",
    WebkitTextStrokeColor: "black",
  };
});

const WrapperImage = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  };
});

const Btn = styled(Button)(({ theme }) => {
  return {
    backgroundColor: "white",
    color: theme.palette.common.black,

    fontSize: "1.1rem",
    fontWeight: 600,
    textTransform: "capitalize",
    borderRadius: "25px",
    padding: "1rem 3rem",
  };
});
