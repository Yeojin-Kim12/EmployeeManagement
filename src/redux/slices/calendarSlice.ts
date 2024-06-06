import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, DocumentData, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export interface Schedule {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface CalendarState {
  currentDate: string;
  isModalOpen: boolean;
  selectedDate: string | null;
  selectedSchedule: Schedule | null;
  schedules: Schedule[];
  loading: boolean;
}

const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  isModalOpen: false,
  selectedDate: null,
  selectedSchedule: null,
  schedules: [],
  loading: false,
};

export const fetchSchedules = createAsyncThunk("calendar/fetchSchedules", async (userId: string) => {
  const snapshot = await new Promise<QuerySnapshot<DocumentData>>((resolve) => onSnapshot(collection(db, `users/${userId}/schedule`), resolve));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    type: doc.data().type,
    startDate: doc.data().startDate,
    endDate: doc.data().endDate,
    color: doc.data().color,
  })) as Schedule[];
  return data;
});

export const addSchedule = createAsyncThunk("calendar/addSchedule", async ({ userId, schedule }: { userId: string; schedule: Omit<Schedule, "id"> }, { dispatch }) => {
  const docRef = await addDoc(collection(db, `users/${userId}/schedule`), schedule as DocumentData);
  const newSchedule = { id: docRef.id, ...schedule };
  await updateDoc(doc(db, `users/${userId}/schedule`, docRef.id), { id: docRef.id });
  dispatch(fetchSchedules(userId));
  return newSchedule;
});

export const updateSchedule = createAsyncThunk("calendar/updateSchedule", async ({ userId, schedule }: { userId: string; schedule: Schedule }) => {
  await updateDoc(doc(db, `users/${userId}/schedule`, schedule.id), schedule as Partial<Schedule>);
  return schedule;
});

export const deleteSchedule = createAsyncThunk("calendar/deleteSchedule", async ({ userId, id }: { userId: string; id: string }) => {
  await deleteDoc(doc(db, `users/${userId}/schedule`, id));
  return id;
});

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string | null>) {
      state.selectedDate = action.payload;
    },
    setSelectedSchedule(state, action: PayloadAction<Schedule | null>) {
      state.selectedSchedule = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.loading = false;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const index = state.schedules.findIndex((schedule) => schedule.id === action.payload.id);
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter((schedule) => schedule.id !== action.payload);
      });
  },
});

export const { setCurrentDate, setIsModalOpen, setSelectedDate, setSelectedSchedule } = calendarSlice.actions;
export default calendarSlice.reducer;
