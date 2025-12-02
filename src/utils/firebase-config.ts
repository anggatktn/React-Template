// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCm4eqceAQn8RQsmC95CcKErOCr5Xx-26o",
    authDomain: "gearturf-3383b.firebaseapp.com",
    projectId: "gearturf-3383b",
    storageBucket: "gearturf-3383b.firebasestorage.app",
    messagingSenderId: "445134768332",
    appId: "1:445134768332:web:350e8d95c98417bbe1da69",
    measurementId: "G-7TG6LD5NWF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);