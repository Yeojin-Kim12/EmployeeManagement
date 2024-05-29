import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const Container = styled.div`
  border: 1px solid #dcdcdc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  color: #3565f6;
`;

const Error = styled.p`
  color: red;
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
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const calculateHours = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDateTime = new Date(0, 0, 0, startHours, startMinutes);
    const endDateTime = new Date(0, 0, 0, endHours, endMinutes);

    let hours =
      (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
    if (hours < 0) {
      hours += 24; // Adjust for overnight shifts
    }

    return hours;
  };

  const calculateAmount = (hours: number) => {
    return hours * 50000;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (type === "연장근무" || type === "휴일근무") {
      const hours = calculateHours(details.startTime, details.endTime);
      if (
        (type === "연장근무" && hours > 5) ||
        (type === "휴일근무" && hours > 48)
      ) {
        setError(`${type}는 최대 5시간입니다.`);
        return;
      }

      await addDoc(collection(db, "corrections"), {
        type,
        ...details,
        hours,
        amount: calculateAmount(hours),
        status: "결제 대기",
      });
    } else {
      await addDoc(collection(db, "corrections"), {
        type,
        ...details,
        status: "결제 대기",
      });
    }

    setShowPopup(true);
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
          날짜:
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
              />
            </label>
            <p>
              예상 수당:{" "}
              {details.startTime && details.endTime
                ? `${calculateAmount(
                    calculateHours(details.startTime, details.endTime)
                  ).toLocaleString()}원`
                : "0원"}
            </p>
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

        {error && <Error>{error}</Error>}
        <button type="submit">신청</button>
      </form>

      {showPopup && (
        <div>
          <p>신청이 완료되었습니다.</p>
          <button onClick={() => setShowPopup(false)}>닫기</button>
        </div>
      )}
    </Container>
  );
};

export default CorrectionRequest;
