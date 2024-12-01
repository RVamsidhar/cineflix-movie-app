import { TMDB_API_ENDPOINT } from "./constants";

export const debounce = (func, duration) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, duration);
  };
};

export const getPopularMoviesApi = (key, page) => {
  return `${TMDB_API_ENDPOINT}/movie/popular?api_key=${key}&language=en-US&page=${page}`;
};

export const getSearchMoviesApi = (key, value, page) => {
  return `${TMDB_API_ENDPOINT}/search/movie?api_key=${key}&query=${value}&include_adult=false&language=en-US&page=${page}`;
};

export const getMovieDetailsApi = (key, id) => {
  return `${TMDB_API_ENDPOINT}/movie/${id}?api_key=${key}&append_to_response=videos%2Cimages&language=en-US`;
};
