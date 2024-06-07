import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import useCalendar from "../../hooks/useCalendar";
import { Schedule } from "../../redux/slices/calendarSlice";

const colorPalette: string[] = ["#d44244", "#fccb05", "#69b054", "#4d7adf", "#b093e6"];

const formatDate = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().substring(0, 16);
};

const CalendarModal = () => {
  const { selectedDate, selectedSchedule, createSchedule, editSchedule, removeSchedule, closeModal } = useCalendar();
  const [type, setType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded && selectedSchedule) {
      setType(selectedSchedule.type);
      setStartDate(selectedSchedule.startDate);
      setEndDate(selectedSchedule.endDate);
      setColor(selectedSchedule.color);
    } else if (!isLoaded && selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setStartDate(formattedDate);
      setEndDate(formattedDate);
    }
    setIsLoaded(true);
  }, [selectedDate, selectedSchedule, isLoaded]);

  const handleSubmit = () => {
    if (type === "" || startDate === "" || endDate === "" || color === "") {
      alert("모두 입력해주세요.");
      return;
    }
    const schedule: Schedule = { id: selectedSchedule ? selectedSchedule.id : "", type, startDate, endDate, color };
    if (selectedSchedule) {
      editSchedule(schedule);
    } else {
      createSchedule(schedule);
    }
    alert("등록되었습니다.");
    closeModal();
  };

  const handleDelete = () => {
    if (selectedSchedule && selectedSchedule.id) {
      removeSchedule(selectedSchedule.id);
      alert("삭제되었습니다.");
      closeModal();
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h1>Schedule</h1>
        <ModalBody>
          <GroupDiv>
            <Label>제목</Label>
            <Input type="text" value={type} onChange={(e: ChangeEvent<HTMLInputElement>) => setType(e.target.value)} />
          </GroupDiv>
          <GroupDiv>
            <Label>시작 날짜</Label>
            <Input type="datetime-local" value={startDate} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)} />
          </GroupDiv>
          <GroupDiv>
            <Label>종료 날짜</Label>
            <Input type="datetime-local" value={endDate} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)} />
          </GroupDiv>
          <GroupDiv>
            <Label>색상</Label>
            <ColorContainer>
              {colorPalette.map((palette) => (
                <ColorDiv key={palette} style={{ backgroundColor: palette }} onClick={() => setColor(palette)}>
                  {color === palette && <CheckMark>✔</CheckMark>}
                </ColorDiv>
              ))}
            </ColorContainer>
          </GroupDiv>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>{selectedSchedule ? "수정" : "저장"}</Button>
          {selectedSchedule && <Button onClick={handleDelete}>삭제</Button>}
          <Button onClick={closeModal}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default CalendarModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 50px;
  border-radius: 5px;
  width: 400px;
  max-width: 100%;
  h1 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #161616;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 50px;
`;

const GroupDiv = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #333333;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ColorDiv = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CheckMark = styled.div`
  color: white;
  font-size: 15px;
  font-weight: bold;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #3565f6;
  color: white;
`;
