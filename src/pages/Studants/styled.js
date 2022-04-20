import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const StudantContainer = styled.div`
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px solid #eee;
  }
  span {
    padding: 0px 20px 0px 20px;
  }
`;
export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 35px;
    border-radius: 50%;
  }
`;
export const Form = styled.div`
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
    margin-bottom: -20px;
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
    margin-top: 0px;
  }
`;

export const NewStudant = styled(Link)`
  padding: 20px 0px 10px 0px;
  display: block;
`;
