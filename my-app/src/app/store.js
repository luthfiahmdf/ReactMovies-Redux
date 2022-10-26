import { configureStore } from "@reduxjs/toolkit";
import { castReducer } from "../features/detailMovies/castMoviesSlice";
import { detailReducer } from "../features/detailMovies/detailMoviesSlice";

import { genreReducer } from "../features/genre/genreSlice";
import { trendingReducer } from "../features/trending/trendingSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // movies: moviesReducer,
    genre: genreReducer,
    trending: trendingReducer,
    detail: detailReducer,
    cast: castReducer,
  },
});
