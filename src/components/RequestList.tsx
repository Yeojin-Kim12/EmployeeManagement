// src/components/RequestList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Container = styled.div`
  border: 1px solid #dcdcdc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  color: #3565f6;
`;

const RequestList: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "corrections"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "corrections", id));
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <Container>
      <Header>신청 내역 확인</Header>
      {requests
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((request) => (
          <div key={request.id}>
            <p>유형: {request.type}</p>
            <p>날짜: {request.startDate}</p>
            <p>상태: {request.status}</p>
            <button onClick={() => handleDelete(request.id)}>삭제</button>
          </div>
        ))}
    </Container>
  );
};

export default RequestList;
