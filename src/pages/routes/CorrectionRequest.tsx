// src/components/CorrectionRequest.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  border: 1px solid #dcdcdc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  color: #3565f6;
`;

const CorrectionRequest: React.FC = () => {
  const [type, setType] = useState<"연장근무" | "무급휴가" | "휴일근무">(
    "연장근무"
  );
  const [details, setDetails] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    additionalInfo: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [estimatedPay, setEstimatedPay] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "corrections"), {
      type,
      ...details,
      status: "결제 대기",
      estimatedPay,
    });
    setShowPopup(true);
  };

  const calculatePay = () => {
    let pay = 0;
    if (type === "연장근무" || type === "휴일근무") {
      const start = new Date(`1970-01-01T${details.startTime}:00`);
      const end = new Date(`1970-01-01T${details.endTime}:00`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      if (hours > 5 && type === "연장근무") {
        alert("연장근무는 5시간을 초과할 수 없습니다.");
        return;
      }
      if (hours > 2 && type === "휴일근무") {
        alert("휴일근무는 2일을 초과할 수 없습니다.");
        return;
      }
      pay = hours * 50000;
    }
    setEstimatedPay(pay);
  };

  return (
    <Container>
      <Header>정정 신청</Header>
      <form onSubmit={handleSubmit}>
        <label>
          신청 유형:
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "연장근무" | "무급휴가" | "휴일근무")
            }
          >
            <option value="연장근무">연장근무</option>
            <option value="무급휴가">무급휴가</option>
            <option value="휴일근무">휴일근무</option>
          </select>
        </label>

        <label>
          {type === "연장근무" || type === "휴일근무"
            ? "정정 날짜"
            : "시작 날짜"}
          <input
            type="date"
            value={details.startDate}
            onChange={(e) =>
              setDetails({ ...details, startDate: e.target.value })
            }
          />
        </label>

        {type === "연장근무" || type === "휴일근무" ? (
          <>
            <label>
              시작 시간:
              <input
                type="time"
                value={details.startTime}
                onChange={(e) =>
                  setDetails({ ...details, startTime: e.target.value })
                }
                onBlur={calculatePay}
              />
            </label>
            <label>
              끝나는 시간:
              <input
                type="time"
                value={details.endTime}
                onChange={(e) =>
                  setDetails({ ...details, endTime: e.target.value })
                }
                onBlur={calculatePay}
              />
            </label>
          </>
        ) : (
          <label>
            끝나는 날짜:
            <input
              type="date"
              value={details.endDate}
              onChange={(e) =>
                setDetails({ ...details, endDate: e.target.value })
              }
            />
          </label>
        )}

        <label>
          추가 내용:
          <textarea
            value={details.additionalInfo}
            onChange={(e) =>
              setDetails({ ...details, additionalInfo: e.target.value })
            }
          />
        </label>

        <button type="submit">신청</button>
      </form>

      {showPopup && (
        <div>
          <p>
            신청이 완료되었습니다. 예상 수당: {estimatedPay.toLocaleString()}원
          </p>
          <button onClick={() => setShowPopup(false)}>닫기</button>
        </div>
      )}
    </Container>
  );
};

export default CorrectionRequest;
