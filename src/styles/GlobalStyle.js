import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
body {
  background: ${colors.primaryDarkColor};
  font-family: sans-serif;
}
html, border-style, #root {
  height: 100%;
}
button {
  cursor: pointer;
  background-color: ${colors.primaryColor};
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 10px 20px;
  font-weight: 700;
}
a {
  text-decoration: none;
  color: ${colors.primaryColor};
}
ul {
  list-style: none;
}

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background: white;
}
`;

export const Container = styled.section`
  max-width: 300px;
  background: white;
  margin: 30px;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
