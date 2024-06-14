import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
  
  :root {
    --color-blue: #3565F6;
    --color-black: #161616;
    --color-gray: #DCDCDC;
  }

  body {
    background-color: #fff;
    color: #161616;
    font-family: "Noto Sans KR", sans-serif;
    position: relative;
  }

  button {
    background-color: var(--color-blue);
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: #274bcf;
    }
  }

  input, textarea {
    border: 1px solid #DCDCDC;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
  }
  `;

export const BlueButton = styled.button`
  background-color: var(--color-blue);
  color: #fff;
  border: none;
  padding: 10px;
  width: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 10px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #274bcf;
  }
`;

export const BlueButtonSml = styled.button`
  background-color: var(--color-blue);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #274bcf;
  }
`;

export default GlobalStyles;
