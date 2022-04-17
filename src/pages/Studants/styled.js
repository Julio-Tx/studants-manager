import styled from 'styled-components';

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
