import { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarModal from "../components/Calendar/CalendarModal";
import CalendarDays from "../components/Calendar/CalendarDays";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

interface Schedule {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  color: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "schedule"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Schedule[];
      setSchedules(data);
    });

    return () => unsub();
  }, []);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(today);
  };

  const openModal = (date: Date, schedule: Schedule | null = null) => {
    setSelectedDate(date);
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      openModal(date);
    } else {
      setCurrentDate(date);
    }
  };

  const handleScheduleClick = (schedule: Schedule) => {
    openModal(new Date(schedule.startDate), schedule);
  };

  return (
    <>
      <CalendarContainer>
        <HeaderContainer>
          <Button onClick={goToPrevMonth}>{"<"}</Button>
          <MonthYear>
            {`${currentDate.getFullYear()}`}년 {`${currentDate.toLocaleString("default", { month: "long" })}`}
          </MonthYear>
          <div>
            <Button onClick={goToToday}>Today</Button>
            <Button onClick={goToNextMonth}>{">"}</Button>
          </div>
        </HeaderContainer>
        <Week>
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </Week>
        <CalendarDays year={year} month={month} schedules={schedules} handleScheduleClick={handleScheduleClick} handleDayClick={handleDayClick} />
      </CalendarContainer>
      {isModalOpen && <CalendarModal setIsModalOpen={setIsModalOpen} selectedDate={selectedDate} selectedSchedule={selectedSchedule} />}
    </>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 30px auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #3565f6;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const MonthYear = styled.h2`
  margin: 0;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  background-color: #f0f0f0;
  padding: 10px 0;
`;
