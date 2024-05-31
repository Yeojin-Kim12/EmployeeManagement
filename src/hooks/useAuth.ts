import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseCofig';
import { setUser, clearUser } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    dispatch(setUser(userCredential.user));
  };

  const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
  };

  const signOutUser = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  return {
    signIn,
    signInWithGoogle,
    register,
    signOutUser,
  };
};
