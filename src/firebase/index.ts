// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB0NDUZq5j8PKQpHsygGKXscwU1Ab-Gkk",
  authDomain: "orange-portfolio-67245.firebaseapp.com",
  projectId: "orange-portfolio-67245",
  storageBucket: "orange-portfolio-67245.appspot.com",
  messagingSenderId: "143197120968",
  appId: "1:143197120968:web:1e5c945d5372917108b8fd",
  measurementId: "G-9GD1R1YST0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
