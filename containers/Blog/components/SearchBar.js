import { useDebounce } from "react-use";
import { useCallback, useState } from "react";

import { TextField } from "@mui/material";

const SearchBar = ({ searchHandler, initState }) => {
  const [searchInput, setSearchInput] = useState(initState);

  useDebounce(
    () => {
      if (initState === searchInput) {
        return;
      }

      searchHandler(searchInput);
    },
    500,
    [searchInput]
  );

  const onChangeHandler = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  return (
    <TextField
      fullWidth
      placeholder="Enter your keywords"
      label="Tìm kiếm"
      onChange={onChangeHandler}
      defaultValue={searchInput || undefined}
    />
  );
};

export default SearchBar;
//   onChange={(e) => searchItems(e.target.value)}
