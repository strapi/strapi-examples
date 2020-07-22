import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import config from '../config';

const LoginRedirect = (props) => {
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token in props.location.search
    fetch(`${config.BACKEND_URL}/auth/${props.match.params.providerName}/callback${props.location.search}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('username', res.user.username);
        setText('You have been successfully logged in. You will be redirected in a few seconds...');
        setTimeout(() => props.history.push('/'), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);
        setText('An error occured, please see the developper console.')
      });
  }, [props.history, props.location.search, props.match.params.providerName]);

  return <p>{text}</p>
};

export default withRouter(LoginRedirect);
