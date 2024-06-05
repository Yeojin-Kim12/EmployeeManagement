import { useState, useEffect } from "react";
import styled from "styled-components";
import CalendarModal from "../components/Calendar/CalendarModal";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
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

  const firstWeek = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const calendarDays = () => {
    const daysArray: { day: number; date: Date; isToday: boolean; isCurrentMonth: boolean; schedules: Schedule[] }[] = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstWeek; i > 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i + 1);
      daysArray.push({ day: prevMonthDays - i + 1, date, isToday: false, isCurrentMonth: false, schedules: [] });
    }

    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
      const dailySchedules = schedules.filter((schedule) => {
        const startDate = new Date(schedule.startDate);
        const endDate = new Date(schedule.endDate);
        return date >= startDate && date <= endDate;
      });
      daysArray.push({ day, date, isToday, isCurrentMonth: true, schedules: dailySchedules });
    }

    const nextMonthDays = 42 - daysArray.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      daysArray.push({ day: i, date, isToday: false, isCurrentMonth: false, schedules: [] });
    }

    return daysArray;
  };

  const days = calendarDays();

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      openModal(date);
    } else {
      setCurrentDate(date);
    }
  };

  const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

  const groupSchedulesByType = (schedules: Schedule[]) => {
    const grouped: { [type: string]: Schedule[] } = {};
    schedules.forEach((schedule) => {
      if (!grouped[schedule.type]) {
        grouped[schedule.type] = [];
      }
      grouped[schedule.type].push(schedule);
    });
    return Object.values(grouped);
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
        <BodyContainer>
          {days.map(({ day, date, isToday, isCurrentMonth, schedules }, index) => (
            <DayContainer
              key={index}
              $isToday={isToday}
              style={{
                opacity: isCurrentMonth ? 1 : 0.5,
              }}
              onClick={() => handleDayClick(date, isCurrentMonth)}
            >
              <div>{day}</div>
              {schedules.length > 0 && isCurrentMonth && (
                <ScheduleInfo>
                  {groupSchedulesByType(schedules).map((groupedSchedules, idx) => (
                    <ScheduleBarRow key={idx}>
                      {groupedSchedules.map((schedule, scheduleIdx) => {
                        const startDate = new Date(schedule.startDate);
                        const endDate = new Date(schedule.endDate);
                        const isStart = isSameDay(date, startDate);
                        const isEnd = isSameDay(date, endDate);
                        return (
                          <ScheduleBar
                            key={scheduleIdx}
                            color={schedule.color}
                            $isStart={isStart}
                            $isEnd={isEnd}
                            style={{
                              gridRowStart: isStart ? startDate.getDate() : "auto",
                              gridRowEnd: isEnd ? endDate.getDate() + 1 : "auto",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(date, schedule);
                            }}
                          >
                            {isStart && <span>{schedule.type}</span>}
                          </ScheduleBar>
                        );
                      })}
                    </ScheduleBarRow>
                  ))}
                </ScheduleInfo>
              )}
            </DayContainer>
          ))}
        </BodyContainer>
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

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  background-color: #f0f0f0;
  padding: 10px 0;
`;

const DayContainer = styled.div<{ $isToday?: boolean }>`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${({ $isToday }) => ($isToday ? "1px solid #3565f6" : "1px solid #dcdcdc")};
  position: relative;
`;

const ScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ScheduleBarRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScheduleBar = styled.div<{ color: string; $isStart: boolean; $isEnd: boolean }>`
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  margin: 2px 0;
  color: white;
  padding: 2px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${({ $isStart, $isEnd }) => ($isStart && $isEnd ? "10px" : $isStart ? "10px 0 0 10px" : $isEnd ? "0 10px 10px 0" : "0")};
  span {
    margin-left: 5px;
  }
`;
