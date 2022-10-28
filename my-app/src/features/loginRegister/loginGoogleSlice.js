import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const initialState = {
  logins: [],
  loading: false,
};

export const postLoginGoogle = createAsyncThunk(
  "loginGoogle/postLoginGoogle",
  async (credentialResponse) => {
    var decoded = jwt_decode(credentialResponse.credential);
    // console.log(decoded);
    localStorage.setItem(
      "token",
      JSON.stringify(credentialResponse.credential)
    );
    localStorage.setItem("image", JSON.stringify(decoded.picture));
    localStorage.setItem("user", JSON.stringify(decoded.name));
    localStorage.setItem("log", JSON.stringify(decoded));
    Swal.fire("Horeee!", "Login Berhasil!", "success");
    return decoded;
  }
);

export const loginGoogleSlice = createSlice({
  name: "loginGoogle",
  initialState,
  reducers: {},
  extraReducers: {
    [postLoginGoogle.pending]: (state) => {
      state.loading = true;
    },
    [postLoginGoogle.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.logins = payload;
    },
    [postLoginGoogle.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const loginGoogleReducer = loginGoogleSlice.reducer;
