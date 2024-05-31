import { useState } from "react";
import styled from "styled-components";

const CalendarModal = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("");
  //build error제거용 콘솔로그
  console.log(color)
  return (
    <ModalContainer>
      <ModalContent>
        <h1>Schedule</h1>
        <div>
          <div>제목</div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <div>시작 날짜</div>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <div>종료 날짜</div>
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <div>색깔</div>
          <div style={{ display: "flex" }}>
            <ColorDiv onClick={() => setColor("#863ce1")}></ColorDiv>
            <ColorDiv onClick={() => setColor("#863ce1")}></ColorDiv>
            <ColorDiv onClick={() => setColor("#863ce1")}></ColorDiv>
            <ColorDiv onClick={() => setColor("#863ce1")}></ColorDiv>
            <ColorDiv onClick={() => setColor("#863ce1")}></ColorDiv>
          </div>
        </div>
        <button>취소</button>
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
  }

  button {
    margin-top: 10px;
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
  }
`;

const ColorDiv = styled.div`
  background-color: #863ce1;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
`;
