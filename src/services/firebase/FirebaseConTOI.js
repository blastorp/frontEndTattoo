import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYSCYjqwrTGNHbJsgm8-cIxYTxs1TtrNA",
  authDomain: "templeofinkgallery.firebaseapp.com",
  projectId: "templeofinkgallery",
  storageBucket: "templeofinkgallery.firebasestorage.app",
  messagingSenderId: "509507963094",
  appId: "1:509507963094:web:714b2cb4d2e01821eb6177",
  measurementId: "G-Q61RQDC0QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app); 

export { getStorage };