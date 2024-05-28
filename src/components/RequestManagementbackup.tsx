// src/components/RequestManagement.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db, auth } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Container = styled.div`
  border: 1px solid #dcdcdc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  color: #3565f6;
`;

const RequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

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

  const handleUpdate = async (id: string, status: string) => {
    await updateDoc(doc(db, "corrections", id), { status });
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  if (!user || !["heeyongi@naver.com"].includes(user.email)) {
    return <p>접근 권한이 없습니다.</p>;
  }

  return (
    <Container>
      <Header>신청 내역 관리</Header>
      {requests
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((request) => (
          <div key={request.id}>
            <p>유형: {request.type}</p>
            <p>날짜: {request.startDate}</p>
            <p>상태: {request.status}</p>
            <button onClick={() => handleUpdate(request.id, "승인")}>
              승인
            </button>
            <button onClick={() => handleUpdate(request.id, "반려")}>
              반려
            </button>
          </div>
        ))}
    </Container>
  );
};

export default RequestManagement;
