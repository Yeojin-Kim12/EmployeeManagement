import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface UserState {
  userInfo: any; // 나중에 구성하는 데이터베이스 내용을 인터페이스화해서 타입 지정하자
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

// 유저 정보 업로드
export const uploadUserInfo = createAsyncThunk(
  'user/uploadUserInfo',
  async (userInfo: any, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), userInfo);
      return { id: docRef.id, ...userInfo };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 유저 정보 업데이트 (프로필 사진 등)
export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async ({ id, userInfo }: { id: string, userInfo: any }, { rejectWithValue }) => {
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, userInfo);
      return { id, ...userInfo };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 유저 정보 가져오기
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (userId: string, { rejectWithValue }) => {
    try {
      const userDoc = doc(db, 'users', userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        return { id: userId, ...docSnap.data() };
      } else {
        return rejectWithValue('No such document!');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(uploadUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
