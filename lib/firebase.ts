import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics };
