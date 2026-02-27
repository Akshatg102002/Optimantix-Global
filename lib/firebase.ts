
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAkkYGflaBbPyR6teV9fXEsf-JuoUibYE",
  authDomain: "optimantix-bff51.firebaseapp.com",
  projectId: "optimantix-bff51",
  storageBucket: "optimantix-bff51.firebasestorage.app",
  messagingSenderId: "48103744786",
  appId: "1:48103744786:web:c0b7e410a2d3f1fb1e3fcb",
  measurementId: "G-SPQNCSY9V9"
};

// Initialize Firebase
// Check if apps already initialized to prevent re-initialization error in HMR or re-renders
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();
const analytics = firebase.analytics();
const auth = firebase.auth();

export { app, db, analytics, auth };
