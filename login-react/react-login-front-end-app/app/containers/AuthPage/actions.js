/*
 *
 * AuthPage actions
 *
 */

import {
  ON_CHANGE,
  SET_FORM,
  SUBMIT,
  SUBMIT_SUCCEEDED,
} from './constants';

/**
 * Modifies the input's value
 * @param  {Object} target input's data
 * @return {Object}
 */
export function onChange({ target }) {
  return {
    type: ON_CHANGE,
    key: target.name,
    value: target.value,
  };
}

/**
 * Generates the form depending on the URL's params
 * @param {string} formType Login, register,...
 * @param {string|undefined} email    Used to set the user's email to reset his password
 */
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

/**
 * Sends the request to the API
 * @return {string}
 */
export function submit() {
  return {
    type: SUBMIT,
  };
}

export function submitSucceeded() {
  return {
    type: SUBMIT_SUCCEEDED,
  };
}
