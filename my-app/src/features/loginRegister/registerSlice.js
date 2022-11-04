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
