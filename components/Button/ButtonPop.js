import { Button as ButtonMui, Box, styled } from "@mui/material";
import { Image } from "../../HOC";

const SIZE = 50;

const TRANSITION = "all 0.3s";

const ButtonPop = ({ svg, isSpecial = false, ...props }) => {
  return (
    <ButtonStyled disableFocusRipple disableTouchRipple>
      <Wrapper component={"div"} className="SVG" id="SVG" isSpecial={isSpecial} {...props}>
        <Image src={svg} height={SIZE} width={SIZE} alt="POP" />
      </Wrapper>
    </ButtonStyled>
  );
};

export default ButtonPop;

// Styled Sheet

const ButtonStyled = styled(ButtonMui)(({ theme }) => {
  return {
    maxWidth: "fit-content",
    maxHeight: "fit-content",
    position: "relative",
  };
});

const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => {
    return prop !== "isSpecial";
  },
})(({ theme, isSpecial }) => {
  let defaultStyle = {
    maxWidth: "content-fit",
    maxHeight: "content-fit",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: "50%",
    transition: TRANSITION,
  };
  if (isSpecial === true) {
    return {
      ...defaultStyle,
      boxShadow: "none",
      "&:hover": {
        transform: "scale(1.3)",
      },
    };
  } else {
    return {
      ...defaultStyle,
    };
  }
});
