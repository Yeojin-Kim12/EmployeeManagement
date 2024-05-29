// src/components/RequestManagement.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

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

const RequestManagement: React.FC = () => {
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

  const handleApprove = async (id: string) => {
    const requestDoc = doc(db, "corrections", id);
    await updateDoc(requestDoc, { status: "승인" });
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: "승인" } : req
      )
    );
  };

  const handleReject = async (id: string) => {
    const requestDoc = doc(db, "corrections", id);
    await updateDoc(requestDoc, { status: "반려" });
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: "반려" } : req
      )
    );
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "corrections", id));
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  return (
    <Container>
      <h2>신청 내역 관리</h2>
      <Table>
        <thead>
          <tr>
            <Th>신청 유형</Th>
            <Th>정정 날짜</Th>
            <Th>시작 시간</Th>
            <Th>종료 시간</Th>
            <Th>시작 날짜</Th>
            <Th>종료 날짜</Th>
            <Th>추가 내용</Th>
            <Th>예상 수당</Th>
            <Th>상태</Th>
            <Th>조치</Th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <Td>{request.type}</Td>
              <Td>{request.startDate}</Td>
              <Td>{request.startTime}</Td>
              <Td>{request.endTime}</Td>
              <Td>{request.startDate}</Td>
              <Td>{request.endDate}</Td>
              <Td>{request.additionalInfo}</Td>
              <Td>
                {request.estimatedPay
                  ? request.estimatedPay.toLocaleString() + "원"
                  : "N/A"}
              </Td>
              <Td>{request.status}</Td>
              <Td>
                <Button onClick={() => handleApprove(request.id)}>승인</Button>
                <Button onClick={() => handleReject(request.id)}>반려</Button>
                <Button onClick={() => handleDelete(request.id)}>삭제</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RequestManagement;
