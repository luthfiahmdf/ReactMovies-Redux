import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],

  loading: false,
};

export const getMoviesList = createAsyncThunk("list/getlist", async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/genre/movie/list`,
      {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      }
    );
    console.log(res);
    return res.data.genres;
  } catch (error) {
    console.log("error");
  }
});

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesList.pending]: (state) => {
      state.loading = true;
    },
    [getMoviesList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.list = payload;
    },
    [getMoviesList.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const listReducer = listSlice.reducer;
