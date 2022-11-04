// import { initializeApp } from "firebase/app";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
// } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyDRXNuyAgrdq-xhQ2H8Ia_Ac5cNQtBkR7c",
//   authDomain: "login-c9664.firebaseapp.com",
//   projectId: "login-c9664",
//   storageBucket: "login-c9664.appspot.com",
//   messagingSenderId: "491201687615",
//   appId: "1:491201687615:web:28044baa800ba5e3dbc88a",
//   measurementId: "G-WQ0E9WJ2H1",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     const res = await signInWithEmailAndPassword(auth, email, password);
//     console.log("Login Succes");
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//     await updateProfile(auth.currentUser, { displayName: name }).catch((err) =>
//       console.log(err)
//     );
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const logout = () => {
//   signOut(auth);
// };

// export {
//   auth,
//   signInWithGoogle,
//   logInWithEmailAndPassword,
//   registerWithEmailAndPassword,
//   logout,
// };
