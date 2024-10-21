import React from "react";
import { MovieCard } from "./MovieCard";

export const MovieList = (props) => {
  // const MovieCard = ({index, movie}) => {
  //   return (
  //     <>
  //       <div className='movieCard' key={index} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
  //         <img src={movie.Poster} alt={movie.Title + ' Poster'} className='moviePoster' width='275' height='400'/>
  //         <div className='overlay'>
  //           <FavouriteComponent movie={movie} handleFavouriteClick={props.handleFavouriteClick}/>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      {Array.isArray(props.movies) &&
        props.movies.map((movie, index) => {
          return (
            <MovieCard
              movie={movie}
              key={index}
              handleFavouriteClick={props.handleFavouriteClick}
              favouriteComponent={props.favouriteComponent}
            />
          );
        })}
    </>
  );
};
