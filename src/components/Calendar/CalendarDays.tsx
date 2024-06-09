import styled from "styled-components";
import { Schedule } from "../../redux/slices/calendarSlice";

interface CalendarDaysProps {
  year: number;
  month: number;
  schedules: Schedule[];
  handleScheduleClick: (schedule: Schedule) => void;
  handleDayClick: (date: Date, isCurrentMonth: boolean) => void;
}

const CalendarDays = ({
  year,
  month,
  schedules,
  handleScheduleClick,
  handleDayClick,
}: CalendarDaysProps) => {
  const today = new Date();

  const calendarDays = () => {
    const daysArray: {
      day: number;
      date: Date;
      isToday: boolean;
      isCurrentMonth: boolean;
      schedules: Schedule[];
    }[] = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    const firstWeek = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = firstWeek; i > 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i + 1);
      daysArray.push({
        day: prevMonthDays - i + 1,
        date,
        isToday: false,
        isCurrentMonth: false,
        schedules: [],
      });
    }

    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate();
      const dailySchedules = schedules.filter((schedule) => {
        const startDate = new Date(schedule.startDate);
        const endDate = new Date(schedule.endDate);
        return date >= startDate && date <= endDate;
      });
      daysArray.push({
        day,
        date,
        isToday,
        isCurrentMonth: true,
        schedules: dailySchedules,
      });
    }

    const nextMonthDays = 42 - daysArray.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      daysArray.push({
        day: i,
        date,
        isToday: false,
        isCurrentMonth: false,
        schedules: [],
      });
    }

    return daysArray;
  };

  const sortSchedules = (schedules: Schedule[]) => {
    const sortedSchedules = [...schedules];
    return sortedSchedules.sort((a, b) => {
      const lengthA =
        new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
      const lengthB =
        new Date(b.endDate).getTime() - new Date(b.startDate).getTime();
      if (lengthA !== lengthB) {
        return lengthB - lengthA;
      }
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
  };

  const isSameDay = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();

  const topPositions = (schedules: Schedule[]) => {
    const absoluteTop: { [key: string]: number } = {};
    const dateTop: { [date: string]: number[] } = {};

    schedules.forEach((schedule) => {
      const startDate = new Date(schedule.startDate);
      const endDate = new Date(schedule.endDate);
      let topPosition = 0;

      for (
        let a = new Date(startDate);
        a <= endDate;
        a.setDate(a.getDate() + 1)
      ) {
        const dateKey = a.toDateString();
        if (!dateTop[dateKey]) {
          dateTop[dateKey] = [];
        }
        while (dateTop[dateKey].includes(topPosition)) {
          topPosition += 25;
        }
        dateTop[dateKey].push(topPosition);
        absoluteTop[`${schedule.id}_${dateKey}`] = topPosition;
      }
    });

    return absoluteTop;
  };

  const absoluteTop = topPositions(sortSchedules(schedules));

  return (
    <BodyContainer>
      {calendarDays().map(
        ({ day, date, isToday, isCurrentMonth, schedules }, index) => (
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
                {sortSchedules(schedules).map((schedule, idx) => {
                  const startDate = new Date(schedule.startDate);
                  const endDate = new Date(schedule.endDate);
                  const isStart = isSameDay(date, startDate);
                  const isEnd = isSameDay(date, endDate);
                  const topPosition =
                    absoluteTop[`${schedule.id}_${date.toDateString()}`];

                  return (
                    <ScheduleBar
                      key={idx}
                      color={schedule.color}
                      $isStart={isStart}
                      $isEnd={isEnd}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScheduleClick(schedule);
                      }}
                      style={{
                        top: `${topPosition}px`,
                        height: "20px",
                      }}
                    >
                      {isStart && <span>{schedule.type}</span>}
                    </ScheduleBar>
                  );
                })}
              </ScheduleInfo>
            )}
          </DayContainer>
        )
      )}
    </BodyContainer>
  );
};

export default CalendarDays;

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayContainer = styled.div<{ $isToday?: boolean }>`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${({ $isToday }) =>
    $isToday ? "1px solid #3565f6" : "1px solid #dcdcdc"};
  position: relative;
`;

const ScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: 100%;
`;

const ScheduleBar = styled.div<{
  color: string;
  $isStart: boolean;
  $isEnd: boolean;
}>`
  background-color: ${({ color }) => color};
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  align-items: center;
  margin: 1px 0;
  color: white;
  padding: 2px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${({ $isStart, $isEnd }) =>
    $isStart && $isEnd
      ? "10px"
      : $isStart
        ? "10px 0 0 10px"
        : $isEnd
          ? "0 10px 10px 0"
          : "0"};
  span {
    margin-left: 5px;
  }
`;
