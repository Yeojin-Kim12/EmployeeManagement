import { useDispatch, useSelector } from "react-redux";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, storage } from "../firebase"; // Firebase Storage 추가
import { setUser, clearUser } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useCallback, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage 관련 함수 추가

interface UserData {
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  joinDate?: string;
  position?: string;
  department?: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  const persistUser = async (userData: UserData) => {
    const userDoc = doc(db, "users", userData.email);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await setDoc(userDoc, userData);
    }

    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(setUser(userData));
  };

  const uploadProfileImage = async (
    email: string,
    file: File | null
  ): Promise<string | null> => {
    if (!file) return null;

    const storageRef = ref(storage, `profileImages/${email}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData: UserData = {
        email: userCredential.user.email,
      } as UserData;
      await persistUser(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const userData: UserData = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      } as UserData;
      await persistUser(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const register = async (
    email: string,
    password: string,
    additionalData: Partial<UserData>,
    profileImage: File | null
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const photoURL = await uploadProfileImage(email, profileImage);
      const userData: UserData = {
        email: userCredential.user.email,
        photoURL,
        ...additionalData,
      } as UserData;
      await persistUser(userData);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      dispatch(clearUser());
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const loadUserFromLocalStorage = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData: UserData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    }
    setLoading(false); // 로딩 상태 업데이트
  }, [dispatch]);

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  return {
    user,
    signIn,
    signInWithGoogle,
    register,
    signOutUser,
    loadUserFromLocalStorage,
    error,
    loading, // 로딩 상태 반환
  };
};
