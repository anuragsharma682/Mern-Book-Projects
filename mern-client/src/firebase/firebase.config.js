// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgcf22w3kA6JlW77rkZIGDDUtB3Bl2wec",
  authDomain: "mern-book-inventory-5fcc4.firebaseapp.com",
  projectId: "mern-book-inventory-5fcc4",
  storageBucket: "mern-book-inventory-5fcc4.appspot.com",
  messagingSenderId: "390083753278",
  appId: "1:390083753278:web:9a8a2e88b4e5499958e86f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;