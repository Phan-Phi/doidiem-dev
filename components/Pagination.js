import {
  Pagination as MuiPagination,
  PaginationItem,
  useTheme,
} from "@mui/material";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

const Pagination = ({ data, onChange, currentPage, limit = 9 }) => {
  const theme = useTheme();
  return (
    <MuiPagination
      count={Math.ceil(data?.length / limit)}
      variant="outlined"
      onChange={onChange}
      page={currentPage}
      sx={{
        ["& .MuiPagination-ul li button"]: {
          color: theme.palette.secondary.light,
          border: `2px solid ${theme.palette.secondary.light}`,
        },

        ["& .MuiPagination-ul"]: {
          justifyContent: "center",
        },
        paddingY: 3,
      }}
      renderItem={(props) => {
        const { type } = props;
        if (type === "page") {
          return null;
        }
        return (
          <PaginationItem
            {...props}
            components={{
              previous: (props) => {
                return (
                  <ArrowRightAltOutlinedIcon
                    sx={{
                      transform: "rotate(180deg)",
                    }}
                    {...props}
                  />
                );
              },

              next: ArrowRightAltOutlinedIcon,
            }}
          />
        );
      }}
    />
  );
};

export default Pagination;
