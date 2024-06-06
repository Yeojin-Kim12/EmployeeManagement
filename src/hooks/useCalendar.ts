import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSchedules, addSchedule, updateSchedule, deleteSchedule, setCurrentDate, setIsModalOpen, setSelectedDate, setSelectedSchedule, Schedule } from "../redux/slices/calendarSlice";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

const useCalendar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { currentDate, isModalOpen, selectedDate, selectedSchedule, schedules, loading } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchSchedules(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedSchedule === null && selectedDate !== null) {
      dispatch(setSelectedDate(null));
    }
  }, [selectedDate, selectedSchedule, dispatch]);

  useEffect(() => {
    if (selectedDate === null && selectedSchedule !== null) {
      dispatch(setSelectedSchedule(null));
    }
  }, [selectedDate, selectedSchedule, dispatch]);

  return {
    currentDate: new Date(currentDate),
    isModalOpen,
    selectedDate: selectedDate ? new Date(selectedDate) : null,
    selectedSchedule,
    schedules,
    loading,
    openModal: (date: Date, schedule: Schedule | null = null) => {
      dispatch(setSelectedDate(date.toISOString()));
      dispatch(setSelectedSchedule(schedule));
      dispatch(setIsModalOpen(true));
    },
    closeModal: () => {
      dispatch(setIsModalOpen(false));
      dispatch(setSelectedSchedule(null));
    },
    createSchedule: (schedule: Omit<Schedule, "id">) => {
      if (user?.email) {
        dispatch(addSchedule({ userId: user.email, schedule }));
      }
    },
    editSchedule: (schedule: Schedule) => {
      if (user?.email) {
        dispatch(updateSchedule({ userId: user.email, schedule }));
      }
    },
    removeSchedule: (id: string) => {
      if (user?.email) {
        dispatch(deleteSchedule({ userId: user.email, id }));
      }
    },
    goToPrevMonth: () => {
      const prevMonth = new Date(new Date(currentDate).setMonth(new Date(currentDate).getMonth() - 1));
      dispatch(setCurrentDate(prevMonth.toISOString()));
    },
    goToNextMonth: () => {
      const nextMonth = new Date(new Date(currentDate).setMonth(new Date(currentDate).getMonth() + 1));
      dispatch(setCurrentDate(nextMonth.toISOString()));
    },
    goToToday: () => {
      dispatch(setCurrentDate(new Date().toISOString()));
    },
  };
};

export default useCalendar;
