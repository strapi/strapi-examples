import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// see https://reactrouter.com/web/example/auth-workflow

const authRequired = (Component) => (props) => !!localStorage.getItem('jwt')
  ? <Component {...props} />
  : <Redirect to='/unauthorized' />;

const ProtectedRoute = ({ component, ...rest }) => (
  <Route {...rest} render={authRequired(component)} />
);

export default ProtectedRoute;
