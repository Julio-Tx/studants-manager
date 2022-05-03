import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  padding: 20px 20px 0px 20px;
  align-content: center;
  display: flex;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
    transition: all 400ms;
  }
  a:hover {
    color: #000000;
  }
  .user {
    justify-content: center;
    display: flex;
    margin-left: auto;
  }
`;
