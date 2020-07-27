import React from 'react';
import { Redirect } from "react-router-dom";

const authRequired = (Component) => (props) => !!localStorage.getItem('jwt')
  ? <Component {...props} />
  : <Redirect to='/unauthorized' />;

export default authRequired;
