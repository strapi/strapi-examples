import { take, call, put, select, takeLatest, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { history } from 'app';
import auth from 'utils/auth';
import request from 'utils/request';
import { LOG_USER } from './constants';

export function* login(action) {
  try {
    const requestURL = `http://localhost:1337/auth/${action.provider}/callback${action.search}`;
    const response = yield call(request, requestURL, { method: 'GET' });

    if (response.jwt) {
      // Set the user's credentials
      yield call(auth.setToken, response.jwt, true);
      yield call(auth.setUserInfo, response.user, true);
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
  yield cancel(loginWatcher)
}

function forwardTo (location) {
  history.push(location)
}
