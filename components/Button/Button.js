import { Button as ButtonMui, Typography, styled } from "@mui/material";

const TRANSITION = "all 0.5s";

const Button = ({
  title,
  isBackground = false,
  backgroundColor = "secondary.main",
  ...props
}) => {
  return (
    <ButtonStyled
      isBackground={isBackground}
      backgroundColor={backgroundColor}
      disableFocusRipple
      disableTouchRipple
      {...props}
    >
      <Title className="text" variant="button">
        {title}
      </Title>
    </ButtonStyled>
  );
};

export default Button;

// Styled Sheet

const ButtonStyled = styled(ButtonMui, {
  shouldForwardProp: (prop) => {
    return prop !== "isBackground" && prop !== "backgroundColor";
  },
})(({ theme, isBackground, backgroundColor }) => {
  let defaultStyle = {
    textTransform: "unset",
    whiteSpace: "nowrap",
    maxWidth: "fit-content",
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1.125),
    paddingBottom: theme.spacing(1.125),
    position: "relative",
    transition: TRANSITION,
    "&:hover": {
      background: theme.palette.primary.light,
      boxShadow: "none",
    },
    "&:active": {
      opacity: 0.75,
      boxShadow: "none",
    },
    "&:hover .text": {
      color: theme.palette.common.white,
    },
  };

  if (isBackground && backgroundColor) {
    return {
      ...defaultStyle,
      background: backgroundColor,
      borderRadius: "10px",
      boxSizing: "border-box",
      backgroundClip: "padding-box",
    };
  } else {
    return {
      ...defaultStyle,
      position: "relative",
    };
  }
});

const Title = styled(Typography)(({ theme }) => {
  return {
    position: "relative",
    color: theme.palette.common.black,
    transition: TRANSITION,
  };
});
