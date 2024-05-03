// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOVk2IxYkMZFR41aTWqDZ7XCyaaWlVB2o",
  authDomain: "park-spot-hub.firebaseapp.com",
  projectId: "park-spot-hub",
  storageBucket: "park-spot-hub.appspot.com",
  messagingSenderId: "766480951761",
  appId: "1:766480951761:web:f2a816cd51cb953acc18f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;