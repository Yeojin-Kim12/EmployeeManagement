import React, { useState } from "react";
import styled from "styled-components";
import { BlueButton } from "../../GlobalStyles";
import { calculateNewSalary, generateSamplePayroll } from "../../utils/payroll";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #dcdcdc;
  padding: 10px;
  background-color: #f0f0f0;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  border: 1px solid #dcdcdc;
  padding: 10px;
  text-align: left;
  font-weight: 400;
`;

const sampleEmployee = {
  name: "김패캠",
  department: "개발부",
  position: "주임",
  hireDate: "2020-01-01",
};

const Detail = () => {
  const baseSalary = 4000000;
  const newSalary = calculateNewSalary(baseSalary, sampleEmployee.hireDate);

  const [visibleMonths, setVisibleMonths] = useState(3);
  const samplePayroll = generateSamplePayroll(10, sampleEmployee.hireDate);

  const handleShowMore = () => {
    setVisibleMonths((prev) => prev + 3);
  };
  const visiblePayroll = samplePayroll.slice(0, visibleMonths);

  return (
    <>
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
        <BlueButton onClick={handleShowMore}>더보기</BlueButton>
      )}
    </>
  );
};

export default Detail;
