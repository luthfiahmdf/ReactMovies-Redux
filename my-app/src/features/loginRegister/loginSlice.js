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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
