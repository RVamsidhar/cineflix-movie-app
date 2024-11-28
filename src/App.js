import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { SearchBox } from "./components/SearchBox";
import { ModelOverlay } from "./components/ModalOverlay";
import { MovieCard } from "./components/MovieCard";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isModelPopupOpen, setIsModelPopupOpen] = useState(false);
  const [modelMovie, setModelMovie] = useState();
  const fetchData = useCallback(async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_ACCESS_KEY}&language=en-US&page=1`
    );
    return await response.json();
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchData().then((list) => {
        setMoviesList(list.results);
      });
    }

    return () => {
      ignore = true;
    };
  }, [fetchData]);

  const handleMovieClick = async (movie) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_ACCESS_KEY}&append_to_response=videos%2Cimages&language=en-US`
    );
    let movieData = await response.json();
    setIsModelPopupOpen(true);
    setModelMovie(movieData);
    document.body.style.overflow = "hidden";
  };

  const onHomeButtonClick = () => {
    fetchData().then((list) => {
      setMoviesList(list.results);
    });
    setSearchValue("");
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="grid grid-cols-3">
        <button onClick={onHomeButtonClick} className="place-self-start">
          <span className="headerTitle">CINEFLIX</span>
        </button>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setMoviesList={setMoviesList}
        />
      </header>
      <main>
        <div className="m-4 grid grid-cols-2 justify-items-center gap-y-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {Array.isArray(moviesList) &&
            moviesList.length > 0 &&
            moviesList.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={handleMovieClick}
                />
              );
            })}
        </div>
        {isModelPopupOpen && (
          <ModelOverlay
            movie={modelMovie}
            setIsModelPopupOpen={setIsModelPopupOpen}
          />
        )}
      </main>
      <footer>Developed by Vamsi</footer>
    </div>
  );
}

export default App;
