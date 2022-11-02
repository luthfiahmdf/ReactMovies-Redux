import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  loginUser: [],
  loading: false,
};

export const postLogin = createAsyncThunk("login/postLog", async (value) => {
  // console.log(value);
  try {
    const res = await axios.post(
      "https://notflixtv.herokuapp.com/api/v1/users/login",
      value
    );
    // console.log(res.data.data);
    localStorage.setItem("token", JSON.stringify(res.data.data.token));
    localStorage.setItem("user", JSON.stringify(res.data.data.first_name));
    localStorage.setItem("image", JSON.parse(res.data.data.image));
    localStorage.setItem("log", JSON.stringify(res.data.data));

    Swal.fire("Horeee!", "Login Berhasil!", "success");
    // console.log(res);
    return res.data.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email atau Password Salah!",
    });
  }
});

export const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {},
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.loading = true;
    },
    [postLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginUser = payload;
    },
    [postLogin.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const loginReducer = loginSlice.reducer;
