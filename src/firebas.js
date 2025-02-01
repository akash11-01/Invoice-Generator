// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "invoice-generator-3ae2e.firebaseapp.com",
  projectId: "invoice-generator-3ae2e",
  storageBucket: "invoice-generator-3ae2e.firebasestorage.app",
  messagingSenderId: "76612922595",
  appId: "1:76612922595:web:0999d6e3fc69b01f5ee9d6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
