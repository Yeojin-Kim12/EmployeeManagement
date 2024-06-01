import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYnGYQMw6oB3WLoFznfdJsBHi7K0eAJc4",
  authDomain: "toy2-project.firebaseapp.com",
  projectId: "toy2-project",
  storageBucket: "toy2-project.appspot.com",
  messagingSenderId: "404432584063",
  appId: "1:404432584063:web:1b930698b8d747b1c76e4a",
  measurementId: "G-6BTTFNNB4E",
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSEGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_ID,
  // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

export default app;
