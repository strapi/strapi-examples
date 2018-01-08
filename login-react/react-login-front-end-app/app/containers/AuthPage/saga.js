import { get, includes, isArray, set } from 'lodash';
import { call, fork, takeLatest, put, select } from 'redux-saga/effects';
import auth from 'utils/auth';
import request from 'utils/request';

import { makeSelectFormType, makeSelectModifiedData } from './selectors';
import { hideLoginErrorsInput, submitError, submitSucceeded } from './actions';
import { SUBMIT } from './constants';

export function* submitForm(action) {
  try {
    const formType = yield select(makeSelectFormType());
    const body = yield select(makeSelectModifiedData());
    let requestURL;

    switch (formType) {
      case 'login':
        requestURL = 'http://localhost:1337/auth/local';
        break;
      case 'register':
        requestURL = 'http://localhost:1337/auth/local/register';
        break;
      case 'reset-password':
        requestURL = 'http://localhost:1337/auth/reset-password';
        break;
      case 'forgot-password':
        requestURL = 'http://localhost:1337/auth/forgot-password';
        set(body, 'url', 'http://localhost:3000/auth/reset-password');
        break;
      default:

    }

    const response = yield call(request, requestURL, { method: 'POST', body });

    if (response.jwt) {
      yield call(auth.setToken, response.jwt, body.rememberMe);
      yield call(auth.setUserInfo, response.user, body.rememberMe);
    }
    yield put(submitSucceeded());
  } catch(error) {
    console.log(error.response.payload.message);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, SUBMIT, submitForm);
}
