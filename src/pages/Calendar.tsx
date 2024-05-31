import React, { useState } from "react";
import styled from "styled-components";
// import CalendarModal from "../../components/Calendar/CalendarModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    setCurrentDate(today);
  };

  const firstWeek = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  const days = [];

  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstWeek; i > 0; i--) {
    days.push(
      <DayContainer style={{ opacity: 0.5 }}>
        <div>{prevMonthDays - i + 1}</div>
        <div>이전 월 일정</div>
      </DayContainer>
    );
  }

  for (let day = 1; day <= lastDay; day++) {
    const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
    days.push(
      <div>
        <DayContainer key={day} isToday={isToday}>
          <div>{day}</div>
          <div>일정</div>
        </DayContainer>
      </div>
    );
  }

  const nextMonthDays = 42 - days.length; //6주기준
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push(
      <DayContainer key={`next-${i}`} style={{ opacity: 0.5 }}>
        <div>{i}</div>
        <div>다음 월 일정</div>
      </DayContainer>
    );
  }

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <>
      <CalendarContainer>
        <HeaderContainer>
          <Button onClick={goToPrevMonth}>{"<"}</Button>
          <MonthYear>
            {`${currentDate.getFullYear()}`}년 {`${currentDate.toLocaleString("default", { month: "long" })}`}
          </MonthYear>
          <div>
            <Button>Add</Button>
            <Button onClick={goToToday}>Today</Button>
            <Button onClick={goToNextMonth}>{">"}</Button>
          </div>
        </HeaderContainer>
        <Week>
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </Week>
        <BodyContainer>{days}</BodyContainer>
      </CalendarContainer>
      {/* <CalendarModal /> */}
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

const DayContainer = styled.div<{ isToday?: boolean }>`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${({ isToday }) => (isToday ? "1px solid #3565f6" : "1px solid #dcdcdc")};
`;
