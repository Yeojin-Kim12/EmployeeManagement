import React from "react";
import styled from "styled-components";
import { useRequest } from "../hooks/useRequest";
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
  const { requests, handleDelete } = useRequest();

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
