import React from "react";
import { TMDB_ORIGINAL_IMAGE_PATH } from "../constants";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="group relative hover:cursor-pointer hover:overflow-hidden"
      onClick={() => onMovieClick(movie)}
    >
      <div className="h-full w-full">
        <img
          className="group-hover:scale-110 group-hover:transition-transform group-hover:duration-300 group-hover:ease-in"
          src={TMDB_ORIGINAL_IMAGE_PATH + movie.poster_path}
          alt={movie.title}
          width="225"
          height="350"
        />
        <div className="absolute inset-0 bg-slate-400 bg-opacity-50 bg-gradient-to-t from-gray-950 to-gray-950/[.7] opacity-0 transition-opacity duration-300 group-hover:bottom-0 group-hover:opacity-100">
          <div className="absolute bottom-0 flex w-full items-end justify-between text-ellipsis p-6">
            <span className="line-clamp-1 text-ellipsis">{movie.title}</span>
            <span>⭐{movie.vote_average.toFixed(1)}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
