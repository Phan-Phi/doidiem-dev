import { styled, Box, Button, Fade } from "@mui/material";
import { useCallback } from "react";

const Category = ({ data, selectCategoryHandler, selectedItem }) => {
  const onClickHandler = useCallback((data) => {
    return (e) => {
      selectCategoryHandler(data);
    };
  }, []);

  return (
    <Fade
      in={true}
      timeout={{
        enter: 500,
      }}
    >
      <Wrapper onClick={onClickHandler(data.id)}>
        <ButtonStyled disableElevation variant={selectedItem == data.id ? "contained" : "outlined"}>
          {data.title}
        </ButtonStyled>
      </Wrapper>
    </Fade>
  );
};

export default Category;

const Wrapper = styled(Box)(({ theme }) => {
  return {
    width: "100%",
  };
});

const ButtonStyled = styled(Button)(({ theme }) => {
  return {
    width: "100%",
    color: theme.palette.common.black,
  };
});
