import {
  all,
  call,
  cancel,
  fork,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { history } from 'app';

// Utils
import auth from 'utils/auth';
import request from 'utils/request';

// Constants
import { LOG_USER } from './constants';

export function* login(action) {
  try {
    const requestURL = `http://localhost:1337/auth/${action.provider}/callback${action.search}`;
    const response = yield call(request, requestURL, { method: 'GET' });

    if (response.jwt) {
      // Set the user's credentials
      yield all([
        call(auth.setToken, response.jwt, true),
        call(auth.setUserInfo, response.user, true),
      ]);
      yield call(forwardTo, '/');
    }

  } catch(error) {
    yield call(forwardTo, '/auth/login');
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  const loginWatcher = yield fork(takeLatest, LOG_USER, login);
  yield take(LOCATION_CHANGE);
  yield cancel(loginWatcher);
}

/**
 * Helper to handle navigation from sagas.
 * @param  {Sting} location The path to navigate
 */
function forwardTo(location) {
  history.push(location)
}
