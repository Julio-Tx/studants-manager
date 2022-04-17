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
    padding-left: 5px;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    border-radius: 3px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
      box-shadow: 0px 0px 2px ${colors.primaryColor};
    }
  }
  button {
    margin-top: 10px;
  }
`;
