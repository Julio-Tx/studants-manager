import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin: 10px 0px 5px 0px;
  }
  input {
    margin-top: 5px;
    height: 35px;
    padding-left: 8px;
    border: 1px solid #eee;
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
export const Span = styled.span`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: -10px;
  justify-content: center;

  Link {
    font-weight: bold;
  }
`;
