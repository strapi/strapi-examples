/**
 *
 * ConnectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Utils
import auth from '../../utils/auth';
import request from '../../utils/request';

class ConnectPage extends React.Component {
  // We only use this lifecycle because it's only mounted once and the saga already handle
  // the redirections depending on the API response

  // NOTE: YOU can delete this container and do the logic in the HomePage formContainer
  // This implementation was just made for the sake of the example and to silmplify the logic
  componentDidMount() {
    const { match: {params: { provider }}, location: { search } } = this.props;
    const requestURL = `http://localhost:1337/auth/${provider}/callback${search}`;

    request(requestURL, { method: 'GET' })
      .then((response) => {
        auth.setToken(response.jwt, true);
        auth.setUserInfo(response.user, true);
        this.redirectUser('/');
      }).catch(err => {
        console.log(err.response.payload)
        this.redirectUser('/auth/login');
      });
  }

  redirectUser = (path) => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <h1>
          Retrieving your token and checking its validity
        </h1>
      </div>
    );
  }
}

ConnectPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ConnectPage;
