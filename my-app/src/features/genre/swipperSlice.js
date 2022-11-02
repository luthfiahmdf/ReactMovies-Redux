import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],

  loading: false,
};

export const getMoviesSwipper = createAsyncThunk(
  "swipper/getSwipper",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/popular`,
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
  }
);

export const swipperSlice = createSlice({
  name: "swipper",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesSwipper.pending]: (state) => {
      state.loading = true;
    },
    [getMoviesSwipper.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getMoviesSwipper.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const swipperReducer = swipperSlice.reducer;
