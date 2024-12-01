import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { SearchBox } from "./components/SearchBox";
import { ModelOverlay } from "./components/ModalOverlay";
import { MovieCard } from "./components/MovieCard";
import { getMovieDetailsApi, getPopularMoviesApi } from "./utils/utils";
import ReactPaginate from "react-paginate";
import {
  NUMBER1,
  NUMBER2,
  NUMBER4,
  NUMBER500,
  NUMBER501,
  ZERO,
} from "./utils/constants";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isModelPopupOpen, setIsModelPopupOpen] = useState(false);
  const [modelMovie, setModelMovie] = useState();
  const [pageNumber, setPageNumber] = useState(NUMBER1);
  const [pageCount, setPageCount] = useState(NUMBER501);
  const [inSearchMode, setInSearchMode] = useState(false);

  const fetchData = useCallback(async () => {
    let response = await fetch(
      getPopularMoviesApi(process.env.REACT_APP_TMDB_API_ACCESS_KEY, pageNumber)
    );
    return await response.json();
  }, [pageNumber]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchData().then((list) => {
        setMoviesList(list.results);
        if (list.total_pages <= NUMBER500) {
          setPageCount(list.total_pages + NUMBER1);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [fetchData]);

  const handleMovieClick = async (movie) => {
    let response = await fetch(
      getMovieDetailsApi(process.env.REACT_APP_TMDB_API_ACCESS_KEY, movie.id)
    );
    let movieData = await response.json();
    setIsModelPopupOpen(true);
    setModelMovie(movieData);
    document.body.style.overflow = "hidden";
  };

  const handleHomePageReset = () => {
    setPageNumber(NUMBER1);
    setPageCount(NUMBER501);
    setInSearchMode(false);
    setSearchValue("");
    fetchData().then((list) => {
      setMoviesList(list.results);
    });
  };

  const handlePaginate = (page) => {
    setPageNumber(page.selected + NUMBER1);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="m-4 grid grid-cols-3">
        <button onClick={handleHomePageReset} className="place-self-start">
          <span className="mx-4 my-8 rounded px-0 py-2 text-5xl font-bold text-[#db2944]">
            CINEFLIX
          </span>
        </button>
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setMoviesList={setMoviesList}
          setInSearchMode={setInSearchMode}
          handleHomePageReset={handleHomePageReset}
        />
      </header>
      <main>
        <div className="m-4 grid grid-cols-2 justify-items-center gap-y-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {Array.isArray(moviesList) &&
            moviesList.length > ZERO &&
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
        {!inSearchMode && (
          <div className="mt-16 flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePaginate}
              pageRangeDisplayed={NUMBER4}
              marginPagesDisplayed={NUMBER2}
              pageCount={pageCount - NUMBER1}
              forcePage={pageNumber - NUMBER1}
              containerClassName="flex pl-0 list-none"
              pageLinkClassName="paginate-button"
              previousLinkClassName="paginate-button"
              nextLinkClassName="paginate-button"
              breakLinkClassName="paginate-button"
              activeLinkClassName="bg-[#db2944]"
              previousLabel="<"
              disabledLinkClassName="cursor-not-allowed hover:bg-inherit"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </main>
      <footer className="m-8 text-center text-xl">Developed by Vamsi</footer>
    </div>
  );
}

export default App;
