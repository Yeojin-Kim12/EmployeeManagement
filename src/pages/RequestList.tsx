import React, { useEffect } from "react";
import styled from "styled-components";
import { useWork } from "../hooks/useWork";
import { useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { fetchWorkRecords } from "../redux/slices/workSlice";
import { AppDispatch } from "../redux/store";
import TableHeader from "../components/Payroll/TableHeader";
import { BlueButtonSml } from "../GlobalStyles";

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
          {workRecords.map((request) => (
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
