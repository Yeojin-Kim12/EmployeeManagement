import React from "react";
import styled from "styled-components";

const Th = styled.th`
  border: 1px solid #dcdcdc;
  padding: 10px;
  background-color: #f0f0f0;
  font-weight: 500;
`;

interface TableHeaderProps {
  columns: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <Th key={index}>{column}</Th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
