// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJGxxASxlF_1X1-59LH1evr1CiKQRyp-k",
  authDomain: "salon-a040d.firebaseapp.com",
  projectId: "salon-a040d",
  storageBucket: "salon-a040d.appspot.com",
  messagingSenderId: "224650319869",
  appId: "1:224650319869:web:f0d00dd026516216ed2b94"
};

// Initialize Firebase\
 
const app = initializeApp(firebaseConfig);
export const AUTH = getAuth(app);
export const STORAGE = getStorage(app);
export const DB = getFirestore(app);
