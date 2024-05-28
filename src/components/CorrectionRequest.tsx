// src/components/CorrectionRequest.tsx
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #3565f6;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #274bcf;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SuccessMessage = styled.p`
  color: green;
`;

const calculateOvertimePay = (hours: number) => hours * 50000;

const CorrectionRequest: React.FC = () => {
  const [type, setType] = useState("overtime");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (type === "overtime") {
      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);
      const hours = (end.getTime() - start.getTime()) / 1000 / 3600;

      if (hours > 5) {
        setError("연장근무는 5시간을 초과할 수 없습니다.");
        return;
      }

      const pay = calculateOvertimePay(hours);
      setSuccess(`연장근무 수당: ${pay.toLocaleString()}원`);
    } else if (type === "holiday") {
      const numOfDays = parseInt(days, 10);

      if (numOfDays > 2) {
        setError("휴일근무는 2일을 초과할 수 없습니다.");
        return;
      }

      const start = new Date(`${date}T${startTime}`);
      const end = new Date(`${date}T${endTime}`);
      const hours = (end.getTime() - start.getTime()) / 1000 / 3600;
      const pay = calculateOvertimePay(hours);
      setSuccess(`휴일근무 수당: ${pay.toLocaleString()}원`);
    }

    // 신청 정보 서버로 전송
  };

  return (
    <Container>
      <h2>정정 신청</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          신청 종류:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="overtime">연장근무</option>
            <option value="holiday">휴일근무</option>
          </select>
        </label>
        <label>
          날짜:
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          시작 시간:
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          종료 시간:
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        {type === "holiday" && (
          <label>
            근무 일수:
            <Input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </label>
        )}
        <label>
          추가 내용:
          <TextArea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <Button type="submit">신청</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
    </Container>
  );
};

export default CorrectionRequest;
