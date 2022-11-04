import { configureStore } from "@reduxjs/toolkit";
import { castReducer } from "../features/detailMovies/castMoviesSlice";
import { detailReducer } from "../features/detailMovies/detailMoviesSlice";
import { listReducer } from "../features/genre/genreListSlice";
import { genreReducer } from "../features/genre/genreSlice";
import { swipperReducer } from "../features/genre/swipperSlice";
import { loginGoogleReducer } from "../features/loginRegister/loginGoogleSlice";
import { loginReducer } from "../features/loginRegister/loginSlice";
import { registReducer } from "../features/loginRegister/registerSlice";
import { searchReducer } from "../features/searchMovies/searchMoviesSlice";
import { trendingReducer } from "../features/trending/trendingSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // movies: moviesReducer,
    genre: genreReducer,
    swipper: swipperReducer,
    list: listReducer,
    trending: trendingReducer,
    detail: detailReducer,
    cast: castReducer,
    search: searchReducer,
    login: loginReducer,
    loginGoogle: loginGoogleReducer,
    regist: registReducer,
  },
});
