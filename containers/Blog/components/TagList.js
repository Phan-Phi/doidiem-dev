import { Chip, Stack } from "@mui/material";

const TagList = ({ items, selectedItem, selectTagHandler, ...props }) => {
  return (
    <Stack direction={"row"} flexWrap={"wrap"} justifyContent="flex-start">
      {items.map((el, index) => {
        return (
          <Chip
            key={index}
            label={el}
            variant={selectedItem === el ? "filled" : "outlined"}
            clickable
            onClick={selectTagHandler(el)}
            sx={{
              marginBottom: "8px !important",
              marginRight: "8px !important",
              backgroundColor: (theme) => {
                if (selectedItem === el) {
                  return theme.palette.primary.main;
                }
              },
            }}
          />
        );
      })}
    </Stack>
  );
};

export default TagList;
