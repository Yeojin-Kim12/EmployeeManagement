// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlt-6-HCxRnmdVh8b8NuYIBUwIP-VDE_E",
  authDomain: "toyproject1-2c4f9.firebaseapp.com",
  projectId: "toyproject1-2c4f9",
  storageBucket: "toyproject1-2c4f9.appspot.com",
  messagingSenderId: "291757916211",
  appId: "1:291757916211:web:951029d9f5624a7d062346",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
