// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkKeiORs8Xgke3rA5n8Zg5v4fMFNpEeho",
  authDomain: "whatsapp-cart.firebaseapp.com",
  projectId: "whatsapp-cart",
  storageBucket: "whatsapp-cart.appspot.com",
  messagingSenderId: "500408032565",
  appId: "1:500408032565:web:88b51d2357c31b0f19807c",
  measurementId: "G-WBXHT5FY7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getAuth(app);
