import React from "react";
import { TMDB_ORIGINAL_IMAGE_PATH } from "../constants";
import { CloseButton } from "./CloseButton";

export const MoviePopupCard = ({ movie, setIsModelPopupOpen }) => {
  const GenreList = () => {
    return (
      <div className="mb-2">
        {movie.runtime + "min"} |{" "}
        {movie.genres.reduce((acc, genre, index) => {
          return (
            acc + genre.name + (index !== movie.genres.length - 1 ? "," : "")
          );
        }, "")}{" "}
        | {movie.release_date.split("-")[0]}
      </div>
    );
  };

  const BackgroundImage = () => {
    return (
      <img
        src={TMDB_ORIGINAL_IMAGE_PATH + movie.backdrop_path}
        alt={movie.title + " Poster"}
        className="absolute top-0 h-full w-full object-cover opacity-25 blur-0"
      />
    );
  };

  return (
    <>
      <div className="absolute right-0 z-10 mr-4 mt-4">
        <CloseButton setIsModelPopupOpen={setIsModelPopupOpen} />
      </div>
      {movie.backdrop_path && <BackgroundImage />}
      <div className="z-10 m-16 flex overflow-auto">
        <img
          src={TMDB_ORIGINAL_IMAGE_PATH + movie.poster_path}
          alt={movie.title}
          className="w-1/3"
        />
        <div className="flex flex-col px-5 font-semibold">
          <h3 className="mb-2 text-3xl">{movie.title}</h3>
          <GenreList />
          <div className="mb-6">⭐{movie.vote_average.toFixed(1)} / 10</div>
          <p>{movie.overview}</p>
        </div>
      </div>
    </>
  );
};
