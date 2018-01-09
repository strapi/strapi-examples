/**
 *
 * SecurePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import WithAuth from 'containers/WithAuth';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSecurePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SecurePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ paddingTop: '30px', textAlign: 'center' }}>
        <h1>Now that you are logged in you have access to this page</h1>
        <p>
          <Link to={`/${Math.random()}`}>Go to another protected url</Link>
        </p>
        <p>
          <Link to="/">Back to HomePage</Link>
        </p>
      </div>
    );
  }
}

SecurePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  securepage: makeSelectSecurePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'securePage', reducer });
const withSaga = injectSaga({ key: 'securePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WithAuth(SecurePage));
