// src/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fff;
    color: #161616;
    font-family: Arial, sans-serif;
    position: relative;
  }

  button {
    background-color: #3565F6;
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

export default GlobalStyles;
