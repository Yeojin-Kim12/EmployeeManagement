// src/components/PayrollDetails.tsx
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #dcdcdc;
  padding: 20px;
  margin-bottom: 20px;
`;

const Header = styled.h2`
  color: #3565f6;
`;

interface Employee {
  name: string;
  department: string;
  position: string;
  hireDate: string;
}

interface Payroll {
  date: string;
  amount: number;
}

interface PayrollDetailsProps {
  employee: Employee;
  payroll: Payroll[];
}

const PayrollDetails: React.FC<PayrollDetailsProps> = ({
  employee,
  payroll,
}) => {
  return (
    <Container>
      <Header>직원 정보</Header>
      <p>이름: {employee.name}</p>
      <p>부서: {employee.department}</p>
      <p>직위: {employee.position}</p>
      <p>입사일: {employee.hireDate}</p>

      <Header>급여 내역</Header>
      {payroll.map((pay, index) => (
        <div key={index}>
          <p>급여일: {pay.date}</p>
          <p>실지급액: {pay.amount}</p>
        </div>
      ))}
    </Container>
  );
};

export default PayrollDetails;
