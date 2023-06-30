// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADpmb3siALk1EjC2bglhxYw0mNQ9yrkgc",
  authDomain: "ecom-5d15a.firebaseapp.com",
  projectId: "ecom-5d15a",
  storageBucket: "ecom-5d15a.appspot.com",
  messagingSenderId: "1063748098839",
  appId: "1:1063748098839:web:e4b8c1293d9cde6fab7552"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);