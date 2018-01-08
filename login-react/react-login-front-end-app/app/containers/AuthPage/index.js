/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './styles.scss';

export class AuthPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="authPage">
        <div className="wrapper">
          <div className="headerContainer">
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authpage: makeSelectAuthPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'authPage', reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
