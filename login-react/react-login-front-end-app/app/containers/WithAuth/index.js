/**
 *
 * Auth
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Utils
import auth from 'utils/auth';

const WithAuth = (WrappedContainer) => class extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (!auth.getToken()) {
      this.props.history.push('/auth/login');
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.foo !== this.props.match.params.foo && !auth.getToken()) {
      this.props.history.push('/auth/login');
    }
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
