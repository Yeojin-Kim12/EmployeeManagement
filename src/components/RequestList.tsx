// src/components/RequestConfirmation.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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

const RequestConfirmation: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "corrections"));
      const requestData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRequests(requestData);
    };

    fetchRequests();
  }, []);

  return (
    <Container>
      <h2>신청 내역 확인</h2>
      <Table>
        <thead>
          <tr>
            <Th>신청 유형</Th>
            <Th>정정 날짜</Th>
            <Th>시작 시간</Th>
            <Th>끝나는 시간</Th>
            <Th>시작 날짜</Th>
            <Th>끝나는 날짜</Th>
            <Th>추가 내용</Th>
            <Th>예상 수당</Th>
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <Td>{request.type}</Td>
              <Td>{request.startDate || "N/A"}</Td>
              <Td>{request.startTime || "N/A"}</Td>
              <Td>{request.endTime || "N/A"}</Td>
              <Td>{request.startDate || "N/A"}</Td>
              <Td>{request.endDate || "N/A"}</Td>
              <Td>{request.additionalInfo || "N/A"}</Td>
              <Td>
                {request.estimatedPay
                  ? request.estimatedPay.toLocaleString() + "원"
                  : "N/A"}
              </Td>
              <Td>{request.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RequestConfirmation;
