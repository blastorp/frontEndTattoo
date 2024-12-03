// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, deleteObject } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj8vTNt3bYm4_uZrmhUB7Zyav4SQrzyU4",
  authDomain: "webapptattoo.firebaseapp.com",
  projectId: "webapptattoo",
  storageBucket: "webapptattoo.firebasestorage.app",
  messagingSenderId: "154561542890",
  appId: "1:154561542890:web:7f437cb2352f8c76bb7593",
  measurementId: "G-1GX3PCF2GY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export  const storage = getStorage(app);
