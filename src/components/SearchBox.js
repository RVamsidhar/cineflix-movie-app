import React from "react";

export const SearchBox = ({ setSearchValue }) => {
  return (
    <>
      <input
        type="text"
        className="search"
        placeholder="Search"
        onChange={(e) => {
          console.log("value is ", e);
          setSearchValue(e.target.value);
        }}
      />
    </>
  );
};
