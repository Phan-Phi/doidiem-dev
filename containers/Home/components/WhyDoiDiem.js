import { Box, styled, Container } from "@mui/material";
import SlickBenefit from "components/Slick/SlickBenefit";

import { LineTitle } from "components/index";

export default function WhyDoiDiem() {
  return (
    <WrapperContainer>
      <WrapperLineTitle>
        <LineTitle titleData={"Tại sao chọn Đổi điểm"} type="center" />
      </WrapperLineTitle>

      <SlickBenefit />
    </WrapperContainer>
  );
}

const WrapperContainer = styled(Container)(({ theme }) => {
  return {
    paddingBottom: "3rem",
    position: "relative",
  };
});

const WrapperLineTitle = styled(Box)(({ theme }) => {
  return {
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
    [theme.breakpoints.down("md")]: {
      paddingBottom: "2.5rem",
    },
  };
});
