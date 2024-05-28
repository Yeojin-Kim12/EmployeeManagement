// src/components/RequestManagement.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

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
  padding: 5px 10px;
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

  const handleApproval = async (requestId: string, approved: boolean) => {
    const requestDoc = doc(db, "corrections", requestId);
    await updateDoc(requestDoc, {
      status: approved ? "승인" : "반려",
    });

    const updatedRequests = requests.map((request) =>
      request.id === requestId
        ? { ...request, status: approved ? "승인" : "반려" }
        : request
    );
    setRequests(updatedRequests);

    if (approved) {
      const request = requests.find((request) => request.id === requestId);
      const { type, hours, days, employeeId } = request;
      let pay = 0;

      if (type === "overtime") {
        pay = hours * 50000;
      } else if (type === "holiday") {
        pay = days * hours * 50000;
      }

      const employeeDoc = doc(db, "employees", employeeId);
      await updateDoc(employeeDoc, {
        payroll: {
          date: new Date().toISOString().split("T")[0],
          amount: pay,
        },
      });
    }
  };

  return (
    <Container>
      <h2>신청 내역 관리</h2>
      <Table>
        <thead>
          <tr>
            <Th>신청 종류</Th>
            <Th>상태</Th>
            <Th>날짜</Th>
            <Th>추가 내용</Th>
            <Th>승인/반려</Th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <Td>{request.type === "overtime" ? "연장근무" : "휴일근무"}</Td>
              <Td>{request.status}</Td>
              <Td>{request.date}</Td>
              <Td>{request.details}</Td>
              <Td>
                <Button onClick={() => handleApproval(request.id, true)}>
                  승인
                </Button>
                <Button onClick={() => handleApproval(request.id, false)}>
                  반려
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RequestManagement;
