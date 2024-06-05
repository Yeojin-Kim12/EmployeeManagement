import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

interface WorkState {
  workRecords: any[];
  schedules: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkState = {
  workRecords: [],
  schedules: [],
  loading: false,
  error: null,
};

export const uploadWorkRecord = createAsyncThunk(
  'work/uploadWorkRecord',
  async (workRecord: any, { rejectWithValue }) => {
    try {
      const createdAt = new Date(); // 클라이언트 측 시간
      const docRef = await addDoc(collection(db, 'workRecords'), {
        ...workRecord,
        createdAt: createdAt
      });
      const uploadedRecord = { id: docRef.id, ...workRecord, createdAt: createdAt };
      return uploadedRecord;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWorkRecords = createAsyncThunk(
  'work/fetchWorkRecords',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'workRecords'));
      const querySnapshot = await getDocs(q);
      const workRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched work records: ', workRecords);
      return workRecords;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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

const handlePending = (state: WorkState) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state: WorkState, action: any, key: 'workRecords' | 'schedules') => {
  state.loading = false;
  if (key === 'workRecords') {
    const workRecords = action.payload.map((record: any) => ({
      ...record,
      createdAt: record.createdAt.toDate() // Convert _Timestamp to Date
    }));
    state.workRecords = workRecords;
  } else {
    state.schedules.push(action.payload);
  }
};


const handleRejected = (state: WorkState, action: any) => {
  state.loading = false;
  state.error = action.payload as string;
};

const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadWorkRecord.pending, handlePending)
      .addCase(uploadWorkRecord.fulfilled, (state, action) => handleFulfilled(state, action, 'workRecords'))
      .addCase(uploadWorkRecord.rejected, handleRejected)
      .addCase(fetchWorkRecords.pending, handlePending)
      .addCase(fetchWorkRecords.fulfilled, (state, action) => handleFulfilled(state, action, 'workRecords'))
      .addCase(fetchWorkRecords.rejected, handleRejected)
      .addCase(uploadSchedule.pending, handlePending)
      .addCase(uploadSchedule.fulfilled, (state, action) => handleFulfilled(state, action, 'schedules'))
      .addCase(uploadSchedule.rejected, handleRejected)
      .addCase(fetchSchedules.pending, handlePending)
      .addCase(fetchSchedules.fulfilled, (state, action) => handleFulfilled(state, action, 'schedules'))
      .addCase(fetchSchedules.rejected, handleRejected);
  },
});

export default workSlice.reducer;
