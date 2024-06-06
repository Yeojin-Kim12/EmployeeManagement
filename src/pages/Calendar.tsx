import styled from "styled-components";
import useCalendar from "../hooks/useCalendar";
import { useDispatch } from "react-redux";
import { Schedule, setCurrentDate } from "../redux/slices/calendarSlice";
import CalendarDays from "../components/Calendar/CalendarDays";
import CalendarModal from "../components/Calendar/CalendarModal";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = () => {
  const dispatch = useDispatch();
  const { currentDate, isModalOpen, schedules, openModal, goToPrevMonth, goToNextMonth, goToToday } = useCalendar();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handleDayClick = (date: Date, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      openModal(date);
    } else {
      dispatch(setCurrentDate(date.toISOString()));
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
      {isModalOpen && <CalendarModal />}
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
