import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Studant from '../pages/Studant';
import Studants from '../pages/Studants';
import Register from '../pages/Register';
import Photos from '../pages/Photos';
import Logout from '../pages/Logout';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Studants} isClosed />
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/logout" component={Logout} isClosed={false} />
      <MyRoute exact path="/register" component={Register} isClosed={false} />
      <MyRoute exact path="/studant/" component={Studant} isClosed />
      <MyRoute exact path="/studant/:id/edit" component={Studant} isClosed />
      <MyRoute exact path="/photos/:id" component={Photos} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
