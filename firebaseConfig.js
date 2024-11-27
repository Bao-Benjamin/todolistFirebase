// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBHkWyceKpINY1RVbcR95xiLJSB_PZ_4S4",
  authDomain: "kong-pj.firebaseapp.com",
  projectId: "kong-pj",
  storageBucket: "kong-pj.firebasestorage.app",
  messagingSenderId: "597862576083",
  appId: "1:597862576083:web:9be2e59f4755dd35594926"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);
export const db = getFirestore(app);
