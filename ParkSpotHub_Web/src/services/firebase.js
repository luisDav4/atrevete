// Import the functions you need from the SDKs you need
import app from "../firebase.config";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
export const db = getFirestore(app)