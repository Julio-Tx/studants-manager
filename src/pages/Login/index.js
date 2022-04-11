import React from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyle';
import { Title } from './styled';
import * as exampleActions from '../../store/modules/examples/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    // dispara a ação para o reducer alterar o estado
    dispatch(exampleActions.clickButtonRequest());
  }

  return (
    <Container>
      <Title isRed>
        Login
        <small>Hello</small>
      </Title>
      <p>Velit in esse Lorem eu enim tempor consectetur fugiat magna.</p>
      <button type="button" onClick={handleClick}>
        Send
      </button>
    </Container>
  );
}
