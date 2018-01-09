/**
 *
 * Auth
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Utils
import auth from 'utils/auth';

const WithAuth = (WrappedContainer) => class extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // Redirect the user to login page if he isn't logged in
    if (this.isLogged()) {
      this.props.history.push('/auth/login');
    }
  }

  componentWillUpdate(nextProps) {
    // Redirect the user to login page if he is not logged in when navigating inside a protected container
    if (nextProps.match.params.foo !== this.props.match.params.foo && this.isLogged()) {
      this.props.history.push('/auth/login');
    }
  }

  /**
   * Checks if the user is logged in
   * Add any other condition here
   * @return {Boolean}
   */
  isLogged = () => {
    return auth.getToken() === null;
  }

  render() {
    return (
      <WrappedContainer {...this.props} />
    );
  }
}

WithAuth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default WithAuth;
