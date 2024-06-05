import React, { useEffect } from "react";
import styled from "styled-components";
import { useWork } from "../hooks/useWork";
import { useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { fetchWorkRecords } from "../redux/slices/workSlice";
import { AppDispatch } from "../redux/store";

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #dcdcdc;
  padding: 10px;
  background-color: #f0f0f0;
`;

const Td = styled.td`
  border: 1px solid #dcdcdc;
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

const RequestConfirmation: React.FC = () => {
  const { workRecords, loading, error } = useWork();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWorkRecords());
  }, [dispatch]);

  useEffect(() => {
    console.log("workRecords:", workRecords);
  }, [workRecords]); // 이펙트를 workRecords가 변경될 때마다 실행되도록 설정

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "workRecords", id));
    dispatch(fetchWorkRecords());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <h2>신청 내역 확인</h2>
      <Table>
        <thead>
          <tr>
            <Th>신청 유형</Th>
            <Th>정정 날짜</Th>
            <Th>시작 시간</Th>
            <Th>종료 시간</Th>
            <Th>추가 내용</Th>
            <Th>예상 수당</Th>
            <Th>상태</Th>
            <Th>조치</Th>
          </tr>
        </thead>
        <tbody>
          {workRecords.flat().map((request: any) => (
            <tr key={request.id}>
              <Td>{request.type || "N/A"}</Td>
              <Td>{request.startDate || "N/A"}</Td>
              <Td>{request.startTime || "N/A"}</Td>
              <Td>{request.endTime || "N/A"}</Td>
              <Td>{request.additionalInfo || "N/A"}</Td>
              <Td>
                {request.estimatedPay
                  ? Math.round(request.estimatedPay).toLocaleString() + "원"
                  : "N/A"}
              </Td>
              <Td>{request.status || "N/A"}</Td>
              <Td>
                <Button onClick={() => handleDelete(request.id)}>삭제</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RequestConfirmation;
