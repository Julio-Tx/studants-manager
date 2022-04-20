import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin: 10px 0px;
    font-weight: 100;
    display: flex;
    flex-direction: column;
  }
  input {
    height: 35px;
    margin-top: 3px;
    padding-left: 10px;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    border-radius: 3px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
      box-shadow: 0px 0px 2px ${colors.primaryColor};
    }
  }
  div {
    display: flex;
    flex-direction: column;
  }
  button {
    margin-top: 10px;
  }
  .delete-button {
    margin-top: 20px;
    background-color: red;
  }
  .delete-button:hover {
    color: black;
  }

  h1 {
    margin: auto;
    margin-top: 20px;
  }
`;
