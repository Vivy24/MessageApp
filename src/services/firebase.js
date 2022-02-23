// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFJx18RniM60mazupzsrcwzhoyaG-9ZG4",
  authDomain: "chatfire-c0870.firebaseapp.com",
  projectId: "chatfire-c0870",
  storageBucket: "chatfire-c0870.appspot.com",
  messagingSenderId: "499171376563",
  appId: "1:499171376563:web:9652709f48b87c6e651fc6",
  measurementId: "G-WJHEBFG3GL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
