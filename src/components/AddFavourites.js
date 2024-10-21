import React from "react";

export const AddFavourites = ({ movie, handleFavouriteClick }) => {
  return (
    <>
      <p>{movie.Title}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis error,
        magnam natus, adipisci pariatur repellendus eius assumenda facere optio
        ea libero obcaecati quod porro inventore soluta esse voluptas nam
        voluptatibus.
      </p>
      <div className="favWrapper" onClick={() => handleFavouriteClick(movie)}>
        <span className="favOverlay">Add to Favourites</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </div>
    </>
  );
};
