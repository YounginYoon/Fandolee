//firbase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj-l4QrI9d0ax3Qv4nPBiCVfWkqre9XYA",
  authDomain: "capstone2023-57a1c.firebaseapp.com",
  projectId: "capstone2023-57a1c",
  storageBucket: "capstone2023-57a1c.appspot.com",
  messagingSenderId: "475497513021",
  appId: "1:475497513021:web:d66a2ba67eeed6d031ea54",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
