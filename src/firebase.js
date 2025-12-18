import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAWzjNeCuK0qGJMqgJ-jEQgGtGE-Lbads",
  authDomain: "stock-alert-app-f9580.firebaseapp.com",
  projectId: "stock-alert-app-f9580",
  storageBucket: "stock-alert-app-f9580.firebasestorage.app",
  messagingSenderId: "668501080418",
  appId: "1:668501080418:web:77c238886b436c19d0943b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

