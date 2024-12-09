import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig2 = {
  apiKey: "AIzaSyCj8vTNt3bYm4_uZrmhUB7Zyav4SQrzyU4",
  authDomain: "webapptattoo.firebaseapp.com",
  projectId: "webapptattoo",
  storageBucket: "webapptattoo.firebasestorage.app",
  messagingSenderId: "154561542890",
  appId: "1:154561542890:web:7f437cb2352f8c76bb7593",
  measurementId: "G-1GX3PCF2GY"
};

// Check if app already exists
const app2 = getApps().some((app) => app.name === "App2")
  ? getApp("App2")
  : initializeApp(firebaseConfig2, "App2");

const analytics = getAnalytics(app2);
const storage2 = getStorage(app2);

export { analytics, storage2 };
