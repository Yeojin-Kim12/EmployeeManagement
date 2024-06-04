import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { uploadUserInfo, fetchUserInfo, updateUserInfo } from '../redux/slices/userSlice';
import { useAuth } from './useAuth';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, loading, error } = useSelector((state: RootState) => state.user);
  const { user } = useAuth();

  const upload = async (userInfo: any) => {
    try {
      await dispatch(uploadUserInfo(userInfo));
    } catch (error) {
      console.error("Error uploading user info:", error);
    }
  };

  const fetch = useCallback(async (userId: string) => {
    try {
      await dispatch(fetchUserInfo(userId));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [dispatch]);


  const update = async (id: string, userInfo: any) => {
    try {
      await dispatch(updateUserInfo({ id, userInfo }));
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetch(user.email);
    }
  }, [user, fetch]);

  return {
    userInfo,
    loading,
    error,
    upload,
    fetch,
    update,
  };
};
