import React from "react";
import styled from "styled-components";
import { calculateNewSalary } from "../utils/payroll";

interface Employee {
  name: string;
  department: string;
  position: string;
  hireDate: string;
}

interface PayrollDetailsProps {
  employee: Employee;
  payroll: { date: string; amount: number }[];
}

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

const PayrollDetails: React.FC<PayrollDetailsProps> = ({
  employee,
  payroll,
}) => {
  const baseSalary = 4000000;
  const newSalary = calculateNewSalary(baseSalary, employee.hireDate);

  return (
    <Container>
      <h2>직원 정보</h2>
      <p>이름: {employee.name}</p>
      <p>부서: {employee.department}</p>
      <p>직위: {employee.position}</p>
      <p>입사일: {employee.hireDate}</p>

      <h2>급여 내역</h2>
      <Table>
        <thead>
          <tr>
            <Th>급여일</Th>
            <Th>실지급액</Th>
          </tr>
        </thead>
        <tbody>
          {payroll.map((entry, index) => (
            <tr key={index}>
              <Td>{entry.date}</Td>
              <Td>{entry.amount.toLocaleString()}원</Td>
            </tr>
          ))}
          <tr>
            <Td>신규 기본급 (3개월 주기 인상 반영)</Td>
            <Td>{newSalary.toLocaleString()}원</Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
