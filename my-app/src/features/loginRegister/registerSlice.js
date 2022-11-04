import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ava from "../../components/assets/users.png";
import Swal from "sweetalert2";
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
const initialState = {
  regist: [],
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
const db = getFirestore(app);

export const postRegister = createAsyncThunk(
  "regist/postRegist",
  async ({ name, email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      await updateProfile(auth.currentUser, { displayName: name }).catch(
        (err) => console.log(err)
      );
      await updateProfile(auth.currentUser, {
        photoURL: ava,
      }).catch((err) => console.log(err));

      Swal.fire("Horeee!", "Register Berhasil", "success");
      // console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Password Udah Ada Yang Pake",
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
