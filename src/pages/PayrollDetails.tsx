import React from "react";
import styled from "styled-components";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Details from "../components/Payroll/Details";

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

const PayrollDetails: React.FC<PayrollDetailsProps> = () => {
  return (
    <Container>
      <h2>직원 정보</h2>
      <ProfileInfo />
      <h2>급여 내역</h2>
      <Details />
    </Container>
  );
};

export default PayrollDetails;
