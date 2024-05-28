import React, { useState } from "react";
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

const generateSamplePayroll = (num: number, hireDate: string) => {
  const samplePayroll = [];
  const baseSalary = 4000000;
  const hireDateObj = new Date(hireDate);

  for (let i = 0; i < num; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);

    const monthsSinceHire =
      (date.getFullYear() - hireDateObj.getFullYear()) * 12 +
      date.getMonth() -
      hireDateObj.getMonth();
    const increments = Math.floor(monthsSinceHire / 3);
    const amount = Math.floor(baseSalary * Math.pow(1.05, increments));

    samplePayroll.push({ date: date.toISOString().split("T")[0], amount });
  }

  return samplePayroll;
};

const PayrollDetails: React.FC<PayrollDetailsProps> = ({
  employee,
  payroll,
}) => {
  const baseSalary = 4000000;
  const newSalary = calculateNewSalary(baseSalary, employee.hireDate);

  const [visibleMonths, setVisibleMonths] = useState(3);

  // Generate sample payroll data for the last 10 months
  const samplePayroll = generateSamplePayroll(10, employee.hireDate);

  const handleShowMore = () => {
    setVisibleMonths((prev) => prev + 3);
  };

  const visiblePayroll = samplePayroll.slice(0, visibleMonths);

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
          <tr>
            <Td>신규 기본급 (3개월 주기 인상 반영)</Td>
            <Td>{newSalary.toLocaleString()}원</Td>
          </tr>
          {visiblePayroll.map((entry, index) => (
            <tr key={index}>
              <Td>{entry.date}</Td>
              <Td>{entry.amount.toLocaleString()}원</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {visibleMonths < samplePayroll.length && (
        <Button onClick={handleShowMore}>더보기</Button>
      )}
    </Container>
  );
};

export default PayrollDetails;
