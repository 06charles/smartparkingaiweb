// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHEf-HHRZJ3uUK0mUspCIEDG2JMW-R6wM",
  authDomain: "smartparkingusingai.firebaseapp.com",
  projectId: "smartparkingusingai",
  storageBucket: "smartparkingusingai.firebasestorage.app",
  messagingSenderId: "403790321603",
  appId: "1:403790321603:web:8d3c06e92b2139a07dcf76",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
