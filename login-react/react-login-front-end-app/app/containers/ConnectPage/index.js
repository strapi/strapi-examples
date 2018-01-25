/**
 *
 * ConnectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { logUser } from './actions';

import makeSelectConnectPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ConnectPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // We only use this lifecycle because it's only mounted once and the saga already handle
  // the redirections depending on the API response

  // NOTE: YOU can delete this container and do the logic in the HomePage formContainer
  // This implementation was just made for the sake of the example and to silmplify the logic
  componentDidMount() {
    const { match, location } = this.props;
    this.props.logUser(match.params.provider, location.search);
  }

  render() {
    return (
      <div>
        Retrieving your token and checking validity
      </div>
    );
  }
}

ConnectPage.propTypes = {
  logUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  connectpage: makeSelectConnectPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logUser,
    },
    dispatch,
  )
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'connectPage', reducer });
const withSaga = injectSaga({ key: 'connectPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ConnectPage);
