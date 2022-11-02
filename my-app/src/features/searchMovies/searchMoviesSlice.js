import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],

  loading: false,
};

export const getMoviesSearch = createAsyncThunk(
  "search/getSearch",
  async (name = false) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=97caff1504fb5f9037e7c577be630b77&query=${name}`,
        {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY,
          },
        }
      );
      // console.log(res.data.results);
      return res.data.results;
    } catch (error) {
      console.log("error");
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesSearch.pending]: (state) => {
      state.loading = true;
    },
    [getMoviesSearch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getMoviesSearch.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const searchReducer = searchSlice.reducer;
