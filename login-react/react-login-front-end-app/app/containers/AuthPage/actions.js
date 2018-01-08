/*
 *
 * AuthPage actions
 *
 */

import {
  HIDE_LOGIN_ERRORS_INPUT,
  ON_CHANGE,
  SET_FORM,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_SUCCEEDED,
} from './constants';

export function hideLoginErrorsInput(value) {
  return {
    type: HIDE_LOGIN_ERRORS_INPUT,
    value,
  };
}

export function onChange({ target }) {
  return {
    type: ON_CHANGE,
    key: target.name,
    value: target.value,
  };
}

export function setForm(formType, email) {
  let data;

  switch (formType) {
    case 'forgot-password':
      data = {
        email: '',
      };

      break;
    case 'login':
      data = {
        identifier: '',
        password: '',
        rememberMe: false,
      };

      break;
    case 'register':
      data = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
      };
      break;
    case 'register-success':
      data = {
        email,
      };
      break;
    case 'reset-password':
      data = {
        password: '',
        passwordConfirmation: '',
        code: email,
      };
      break;
    default:
      data = {};
  }

  return {
    type: SET_FORM,
    data,
    formType,
  };
}

export function submit() {
  return {
    type: SUBMIT,
  };
}

export function submitError(formErrors) {
  console.log(formErrors);
  return {
    type: SUBMIT_ERROR,
    formErrors,
  };
}

export function submitSucceeded() {
  return {
    type: SUBMIT_SUCCEEDED,
  };
}
