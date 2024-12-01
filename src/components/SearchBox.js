import React from "react";
import { debounce, getSearchMoviesApi } from "../utils/utils";

export const SearchBox = ({
  searchValue,
  setSearchValue,
  setMoviesList,
  setInSearchMode,
  handleHomePageReset,
}) => {
  const handleInputChange = async (e) => {
    if (e.target.value.length > 3) {
      let response = await fetch(
        getSearchMoviesApi(
          process.env.REACT_APP_TMDB_API_ACCESS_KEY,
          e.target.value,
          1
        )
      );
      let movieList = await response.json();
      setMoviesList(movieList.results);
    }
  };

  const debouncedSearch = debounce(handleInputChange, 1000);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setInSearchMode(true);
    if (e.target.value === "") {
      handleHomePageReset();
    } else {
      debouncedSearch(e);
    }
  };

  return (
    <>
      <input
        type="text"
        className="h-10 w-80 self-center justify-self-center rounded-full bg-[#333] p-4 placeholder:ml-3 placeholder:text-[1.2em]"
        placeholder="Search"
        onChange={handleSearch}
        value={searchValue}
      />
    </>
  );
};
