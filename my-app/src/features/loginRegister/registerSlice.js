import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  regist: [],
  loading: false,
};

export const postRegister = createAsyncThunk(
  "regist/postRegist",
  async (payload) => {
    // console.log(payload);
    try {
      const res = await axios.post(
        "https://notflixtv.herokuapp.com/api/v1/users",
        payload
      );
      // console.log(res.data.data);

      Swal.fire("Horeee!", "Register Berhasil", "success");

      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau Password Salah!",
      });
    }
  }
);

export const registSlice = createSlice({
  name: "regist",
  initialState,
  reducers: {},
  extraReducers: {
    [postRegister.pending]: (state) => {
      state.loading = true;
    },
    [postRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.regist = payload;
    },
    [postRegister.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const registReducer = registSlice.reducer;
