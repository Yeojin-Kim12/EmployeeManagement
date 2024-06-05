// src/features/calendar/calendarSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query } from "firebase/firestore";
import { db } from "../../firebase";

export interface Calendar {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface CalendarState {
  calendar: Calendar[];
  selectedDate: Date | null;
  selectedSchedule: Calendar | null;
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  calendar: [],
  selectedDate: null,
  selectedSchedule: null,
  loading: false,
  error: null,
};

export const fetchCalendar = createAsyncThunk<Calendar[], void>("calendar/fetchCalendar", async (_, { rejectWithValue }) => {
  try {
    const q = query(collection(db, "schedule"));
    const querySnapshot = await getDocs(q);
    const calendar = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Calendar[];
    return calendar;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const uploadCalendar = createAsyncThunk<Calendar, Omit<Calendar, "id">>("calendar/uploadCalendar", async (schedule: Omit<Calendar, "id">, { rejectWithValue }) => {
  try {
    const docRef = await addDoc(collection(db, "schedule"), schedule);
    return { id: docRef.id, ...schedule };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateCalendar = createAsyncThunk<Calendar, Calendar>("calendar/updateCalendar", async (schedule: Calendar, { rejectWithValue }) => {
  try {
    await updateDoc(doc(db, "schedule", schedule.id), {
      type: schedule.type,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      color: schedule.color,
    });
    return schedule;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteCalendar = createAsyncThunk<string, string>("calendar/deleteCalendar", async (id: string, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "schedule", id));
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const handlePending = (state: CalendarState) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state: CalendarState, action: any, key: "calendar") => {
  state.loading = false;
  if (key === "calendar") {
    state.calendar = action.payload;
  }
};

const handleRejected = (state: CalendarState, action: any) => {
  state.loading = false;
  state.error = action.payload as string;
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.selectedDate = null;
      state.selectedSchedule = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendar.pending, handlePending)
      .addCase(fetchCalendar.fulfilled, (state, action) => handleFulfilled(state, action, "calendar"))
      .addCase(fetchCalendar.rejected, handleRejected)
      .addCase(uploadCalendar.pending, handlePending)
      .addCase(uploadCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.calendar.push(action.payload);
      })
      .addCase(uploadCalendar.rejected, handleRejected)
      .addCase(updateCalendar.pending, handlePending)
      .addCase(updateCalendar.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.calendar.findIndex((schedule) => schedule.id === action.payload.id);
        if (index !== -1) {
          state.calendar[index] = action.payload;
        }
      })
      .addCase(updateCalendar.rejected, handleRejected)
      .addCase(deleteCalendar.pending, handlePending)
      .addCase(deleteCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.calendar = state.calendar.filter((schedule) => schedule.id !== action.payload);
      })
      .addCase(deleteCalendar.rejected, handleRejected);
  },
});

export const { closeModal } = calendarSlice.actions;
export default calendarSlice.reducer;
