import React, { useState } from "react";
import styled from "styled-components";
import { BlueButton } from "../GlobalStyles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store"; // AppDispatch를 가져옵니다.
import { uploadWorkRecord } from "../redux/slices/workSlice";
import { useWork } from "../hooks/useWork";
import { getAuth } from "firebase/auth"; 

const Container = styled.div`
  width: 800px;
  margin-left: 2rem;
  padding: 20px;
  margin: 0 auto;
`;
const Header = styled.h3`
  color: black;
`;
const Form = styled.form`
  display: flex;
`;
const TypeOptions = styled.div`
  display: flex-column;
  font-weight: 500;
`;
const Select = styled.select`
  width: 150px;
  height: 40px;
  margin-top: 10px;
  font-size: 1rem;
  padding: 0 5px;
  background-color: var(--color-gray);
`;
const CorrectionFields = styled.div`
  display: flex-column;
  margin-left: 10rem;
  font-weight: 500;
`;
const Input = styled.input`
  background-color: var(--color-gray);
  height: 25px;
  margin-top: 7px;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  background-color: var(--color-gray);
  margin-top: 7px;
  font-size: 1rem;
`;

const CorrectionRequest: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // useDispatch에 AppDispatch 타입을 지정합니다.
  const { estimatedPay, calculatePay } = useWork();
  const [type, setType] = useState<"연장근무" | "무급휴가" | "휴일근무">(
    "연장근무"
  );
   
  const auth = getAuth();
  const user = auth.currentUser;


  const [details, setDetails] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    additionalInfo: "",
    email: user?.email || "", 
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workRecord = {
      type,
      ...details,
      status: "결제 대기",
      estimatedPay,
    };
    await dispatch(uploadWorkRecord(workRecord));
    setShowPopup(true);
  };

  return (
    <Container>
      <Header>정정 신청</Header>

      <Form onSubmit={handleSubmit}>
        <TypeOptions>
          <label>
            신청 유형:
            <Select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "연장근무" | "무급휴가" | "휴일근무")
              }
            >
              <option value="연장근무">연장근무</option>
              <option value="무급휴가">무급휴가</option>
              <option value="휴일근무">휴일근무</option>
            </Select>
          </label>
        </TypeOptions>

        <CorrectionFields>
          <label>
            {type === "연장근무" || type === "휴일근무"
              ? "정정 날짜:"
              : "시작 날짜:"}
            <Input
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
                <Input
                  type="time"
                  value={details.startTime}
                  onChange={(e) =>
                    setDetails({ ...details, startTime: e.target.value })
                  }
                  onBlur={() => calculatePay(type, details)}
                />
              </label>
              <label>
                끝나는 시간:
                <Input
                  type="time"
                  value={details.endTime}
                  onChange={(e) =>
                    setDetails({ ...details, endTime: e.target.value })
                  }
                  onBlur={() => calculatePay(type, details)}
                />
              </label>
            </>
          ) : (
            <label>
              끝나는 날짜:
              <Input
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
            <TextArea
              value={details.additionalInfo}
              onChange={(e) =>
                setDetails({ ...details, additionalInfo: e.target.value })
              }
            />
          </label>

          <BlueButton type="submit">신청</BlueButton>
          {showPopup && (
            <div>
              <p>
                신청이 완료되었습니다. 예상 수당:{estimatedPay.toLocaleString()}
                원
              </p>
              <BlueButton onClick={() => setShowPopup(false)}>닫기</BlueButton>
            </div>
          )}
        </CorrectionFields>
      </Form>
    </Container>
  );
};

export default CorrectionRequest;
