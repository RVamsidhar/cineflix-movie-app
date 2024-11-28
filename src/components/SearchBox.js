import React from "react";
import { debounce } from "../utils/utils";

export const SearchBox = ({ searchValue, setSearchValue, setMoviesList }) => {
  const handleInputChange = async (e) => {
    if (e.target.value.length > 3) {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_ACCESS_KEY}&query=${e.target.value}&include_adult=false&language=en-US&page=1`
      );
      let movieList = await response.json();
      setMoviesList(movieList.results);
    }
  };

  const debouncedSearch = debounce(handleInputChange, 1000);

  return (
    <>
      <input
        type="text"
        className="search justify-self-center rounded-full focus:h-10 focus:bg-[#333]"
        placeholder="Search"
        onChange={(e) => {
          setSearchValue(e.target.value);
          debouncedSearch(e);
        }}
        value={searchValue}
      />
    </>
  );
};
