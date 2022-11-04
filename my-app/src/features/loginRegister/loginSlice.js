import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const initialState = {
  loginUser: {},
  loading: false,
};

const firebaseConfig = {
  apiKey: "AIzaSyDRXNuyAgrdq-xhQ2H8Ia_Ac5cNQtBkR7c",
  authDomain: "login-c9664.firebaseapp.com",
  projectId: "login-c9664",
  storageBucket: "login-c9664.appspot.com",
  messagingSenderId: "491201687615",
  appId: "1:491201687615:web:28044baa800ba5e3dbc88a",
  measurementId: "G-WQ0E9WJ2H1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const logIn = createAsyncThunk(
  "login/postLog",
  async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", JSON.stringify(res.user.accessToken));
      localStorage.setItem("user", JSON.stringify(res.user.displayName));
      localStorage.setItem("image", JSON.stringify(res.user.photoURL));
      localStorage.setItem("log", JSON.stringify(res.user));

      // console.log(res);
      return res.user.providerData;
    } catch (err) {
      console.error(err);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [logIn.pending]: (state) => {
      state.loading = true;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginUser = payload;
    },
    [logIn.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const loginReducer = loginSlice.reducer;
