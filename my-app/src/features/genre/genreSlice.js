import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],

  loading: false,
};
let name = "name";
export const getGenre = createAsyncThunk("genre/getGenre", async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=97caff1504fb5f9037e7c577be630b77&language=en-US&query=${name}`,
      {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      }
    );
    // console.log(res);
    return res.data.results;
  } catch (error) {
    console.log("error");
  }
});

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: {
    [getGenre.pending]: (state) => {
      state.loading = true;
    },
    [getGenre.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getGenre.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const genreReducer = genreSlice.reducer;
