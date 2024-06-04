import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

interface WorkState {
  workRecords: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkState = {
  workRecords: [],
  loading: false,
  error: null,
};

// 업무 정정 요청 업로드
export const uploadWorkRecord = createAsyncThunk(
  'work/uploadWorkRecord',
  async (workRecord: any, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'workRecords'), workRecord);
      return { id: docRef.id, ...workRecord };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 업무 정정 요청 가져오기
export const fetchWorkRecords = createAsyncThunk(
  'work/fetchWorkRecords',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'workRecords'));
      const querySnapshot = await getDocs(q);
      const workRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return workRecords;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 캘린더 스케쥴 업로드
export const uploadSchedule = createAsyncThunk(
  'work/uploadSchedule',
  async (schedule: any, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'schedules'), schedule);
      return { id: docRef.id, ...schedule };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 캘린더 스케쥴 가져오기
export const fetchSchedules = createAsyncThunk(
  'work/fetchSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'schedules'));
      const querySnapshot = await getDocs(q);
      const schedules = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return schedules;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadWorkRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadWorkRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.workRecords.push(action.payload);
      })
      .addCase(uploadWorkRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchWorkRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.workRecords = action.payload;
      })
      .addCase(fetchWorkRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.workRecords.push(action.payload);
      })
      .addCase(uploadSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.workRecords = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default workSlice.reducer;
