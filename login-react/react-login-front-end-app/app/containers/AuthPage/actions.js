/*
 *
 * AuthPage actions
 *
 */

import {
  ON_CHANGE,
  SET_FORM,
} from './constants';

export function onChange({ target }) {
  console.log('t', target);
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
