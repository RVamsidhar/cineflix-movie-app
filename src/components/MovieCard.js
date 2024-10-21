import React from "react";
import { useState } from "react";

export const MovieCard = ({
  movie,
  handleFavouriteClick,
  favouriteComponent,
}) => {
  const [movieCardIsHovered, setMovieCardIsHovered] = useState(false);

  const HoverMovieCard = () => {
    return (
      <>
        <div className="hoverMovieCard" onMouseLeave={handleMouseLeave}>
          <img
            src={movie.Poster}
            alt={movie.Title + " Poster"}
            className="moviePoster"
            width="275"
            height="400"
          />
          <div className="hoverMovieCardText" style={{ color: "white" }}>
            {movie.plot}
          </div>
        </div>
      </>
    );
  };

  const FavouriteComponent = favouriteComponent;

  const handleMouseEnter = (event) => {
    console.log("Entered");
    event.stopPropagation();
    setMovieCardIsHovered(!movieCardIsHovered);
  };

  const handleMouseLeave = (event) => {
    console.log("Left");
    event.stopPropagation();
    setMovieCardIsHovered(!movieCardIsHovered);
  };

  return (
    <div className="movieCard" onMouseEnter={handleMouseEnter}>
      <img
        src={movie.Poster}
        alt={movie.Title + " Poster"}
        className="moviePoster"
        width="275"
        height="400"
      />
      <div className="overlay">
        <FavouriteComponent
          movie={movie}
          handleFavouriteClick={handleFavouriteClick}
        />
      </div>
    </div>
  );
};
