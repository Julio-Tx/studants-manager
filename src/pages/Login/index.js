import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyle';
import { Form, Span } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const prevPath = get(props, 'location.state.prevPath', '/');
  const id = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let errorsForm = false;

    if (!isEmail(email)) {
      errorsForm = true;
      toast.error('Invalid e-mail');
    }
    if (password.length < 6 || password.length > 50) {
      errorsForm = true;
      toast.error('Invalid password');
    }

    if (errorsForm) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }
  if (!id) {
    return (
      <Container>
        <Loading />
        <h1>Login</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </label>
          <button type="submit">Send</button>
        </Form>
        <Span>
          <p>
            Not registered yet? <Link to="/register">Register</Link>
          </p>
        </Span>
      </Container>
    );
  }
  return dispatch(actions.loginFailure());
}
