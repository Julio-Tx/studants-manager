// eslint-disable-next-line
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/modules/auth/actions';

export default function Logout() {
  const dispatch = useDispatch();

  dispatch(actions.loginFailure());

  return <Redirect to="/login" />;
}
