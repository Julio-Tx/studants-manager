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
export const ProfilePicture = styled.div`
  margin: 10px 0px 60px 300px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #000000;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  input {
    margin: 15px 0px 0px -90px;
  }
`;
