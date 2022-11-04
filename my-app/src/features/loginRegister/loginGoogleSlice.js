import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

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
const db = getFirestore(app);
const initialState = {
  logins: [],
  loading: false,
};

const googleProvider = new GoogleAuthProvider();
export const postLoginGoogle = createAsyncThunk(
  "loginGoogle/postLoginGoogle",
  async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      localStorage.setItem("user", JSON.stringify(user.displayName));
      localStorage.setItem("image", JSON.stringify(user.photoURL));
      localStorage.setItem("log", JSON.stringify(user));
      Swal.fire("Horeee!", "Login Berhasil!", "success");

      // console.log(user);
      return res.providerData;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
