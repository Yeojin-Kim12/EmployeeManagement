// src/hooks/useCalendar.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchCalendar, uploadCalendar, updateCalendar, deleteCalendar, closeModal as closeCalendarModal } from "../redux/slices/calendarSlice";
import { useEffect, useState } from "react";
import { Calendar } from "../redux/slices/calendarSlice";

export const useCalendar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { calendar, loading, error } = useSelector((state: RootState) => state.calendar);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Calendar | null>(null);

  useEffect(() => {
    dispatch(fetchCalendar());
  }, [dispatch]);

  const openModal = (date: Date, schedule: Calendar | null = null) => {
    setSelectedDate(date);
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedSchedule(null);
    dispatch(closeCalendarModal());
  };

  const handleScheduleClick = (schedule: Calendar) => {
    openModal(new Date(schedule.startDate), schedule);
  };

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      openModal(date);
    }
  };

  const addOrUpdateSchedule = async (schedule: Omit<Calendar, "id"> | Calendar) => {
    if ("id" in schedule) {
      dispatch(updateCalendar(schedule));
    } else {
      dispatch(uploadCalendar(schedule));
    }
  };

  const removeSchedule = async (id: string) => {
    dispatch(deleteCalendar(id));
  };

  return {
    calendar,
    loading,
    error,
    selectedDate,
    isModalOpen,
    selectedSchedule,
    openModal,
    closeModal,
    handleScheduleClick,
    handleDayClick,
    addOrUpdateSchedule,
    removeSchedule,
  };
};
