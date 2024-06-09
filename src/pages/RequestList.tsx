import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { fetchWorkRecords } from "../redux/slices/workSlice";
import { AppDispatch } from "../redux/store";
import TableHeader from "../components/Payroll/TableHeader";
import { BlueButtonSml } from "../GlobalStyles";
import { useWork } from "../hooks/useWork";

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Td = styled.td`
  border: 1px solid #dcdcdc;
  padding: 10px;
  text-align: center;
  font-weight: 400;
`;

const RequestConfirmation: React.FC = () => {
  const { workRecords, loading, error } = useWork();
  const dispatch = useDispatch<AppDispatch>();
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      dispatch(fetchWorkRecords());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && workRecords) {
      const userRecords = workRecords.filter(record => record.email === user.email);
      setFilteredRecords(userRecords);
    }
  }, [workRecords, user]);

  useEffect(() => {
    console.log("workRecords:", workRecords);
  }, [workRecords]);

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

  if (!user) {
    return <p>Please log in to view your work records.</p>;
  }

  const columns = [
    "신청 유형",
    "정정 날짜",
    "시작 시간",
    "종료 시간",
    "시작 날짜",
    "종료 날짜",
    "추가 내용",
    "예상 수당",
    "상태",
    "조치",
  ];

  return (
    <Container>
      <h3>신청 내역 확인</h3>
      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {filteredRecords.map((request) => (
            <tr key={request.id}>
              <Td>{request.type || "N/A"}</Td>
              <Td>{request.startDate || "N/A"}</Td>
              <Td>{request.startTime || "N/A"}</Td>
              <Td>{request.endTime || "N/A"}</Td>
              <Td>{request.startDate || "N/A"}</Td>
              <Td>{request.endDate || "N/A"}</Td>
              <Td>{request.additionalInfo || "N/A"}</Td>
              <Td>
                {request.estimatedPay
                  ? Math.round(request.estimatedPay).toLocaleString() + "원"
                  : "N/A"}
              </Td>
              <Td>{request.status || "N/A"}</Td>
              <Td>
                <BlueButtonSml onClick={() => handleDelete(request.id)}>
                  삭제
                </BlueButtonSml>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RequestConfirmation;
