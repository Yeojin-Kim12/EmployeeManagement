import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYnGYQMw6oB3WLoFznfdJsBHi7K0eAJc4",
  authDomain: "toy2-project.firebaseapp.com",
  projectId: "toy2-project",
  storageBucket: "toy2-project.appspot.com",
  messagingSenderId: "404432584063",
  appId: "1:404432584063:web:1b930698b8d747b1c76e4a",
  measurementId: "G-6BTTFNNB4E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

export default app;
