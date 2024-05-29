import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export { auth, signInWithGoogle };

export default app;
