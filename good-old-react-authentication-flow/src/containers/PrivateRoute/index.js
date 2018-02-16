/**
 *
 * PrivateRoute
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: 'auth/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
