// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9kE4vgH3hKNnmTjxTmCHgplKwGMCQJ9Q",
  authDomain: "prime-solutions-c9d6d.firebaseapp.com",
  projectId: "prime-solutions-c9d6d",
  storageBucket: "prime-solutions-c9d6d.firebasestorage.app",
  messagingSenderId: "364182143626",
  appId: "1:364182143626:web:edaa9f68f3296a4c772373"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);