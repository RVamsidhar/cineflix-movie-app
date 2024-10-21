import "./App.css";
import { useEffect, useState } from "react";
import { MovieList } from "./components/MovieList";
import { SearchBox } from "./components/SearchBox";
import { AddFavourites } from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("avengers");

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("movie-app-favourites")
    );
    setFavourites(movieFavourites);
  }, []);

  useEffect(() => {
    async function getMovieList() {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d4f28cda`;
      const data = await fetch(url);
      console.log("Data is ", data);
      const responseData = await data.json();
      console.log("response data is ", responseData);
      setMovies(responseData["Search"]);
    }
    getMovieList();
  }, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-app-favourites", JSON.stringify(items));
  };

  const actionFavouriteClick = (movie) => {
    let isFound = false;
    console.log("Favourites are ", favourites);
    if (Array.isArray(favourites)) {
      for (let i = 0; i < favourites.length; i++) {
        if (favourites[i].imdbID === movie.imdbID) {
          isFound = true;
        }
      }
    }

    if (!isFound) {
      let newFavourites;
      if (Array.isArray(favourites)) {
        newFavourites = [...favourites, movie];
      } else {
        newFavourites = [movie];
      }
      setFavourites(newFavourites);
      saveToLocalStorage(newFavourites);
    }
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container">
      <header className="headerWrapper">
        <span className="headerTitle">Cinemate</span>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      <main>
        {Array.isArray(movies) && movies.length > 0 && (
          <div className="movies">
            <h2 className="moviesTitle">Movies</h2>
            <div className="movieListWrapper">
              <MovieList
                movies={movies}
                handleFavouriteClick={actionFavouriteClick}
                favouriteComponent={AddFavourites}
              />
            </div>
          </div>
        )}
        {Array.isArray(favourites) && favourites.length > 0 && (
          <div className="favourties">
            <h2 className="favTitle">Favourites</h2>
            <div className="favouritesWrapper">
              <MovieList
                movies={favourites}
                handleFavouriteClick={removeFavouriteMovie}
                favouriteComponent={RemoveFavourites}
              />
            </div>
          </div>
        )}
      </main>
      <footer>Made by Vamsi</footer>
    </div>
  );
}

export default App;
