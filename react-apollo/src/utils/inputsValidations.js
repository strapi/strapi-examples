/* eslint-disable no-useless-escape */
import { includes, mapKeys, reject } from 'lodash';
/**
 * [validateInput description]
 * @param  {String || Number} value  Input's value
 * @param  {Object} inputValidations
 * @param  {String} [type='text']    Optionnal: the input's type only for email
 * @return {Array}                  Array of errors to be displayed
 */
const validateInput = (value, inputValidations = {}, type = 'text') => {
  let errors = [];

  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  // handle i18n
  const requiredError = { id: 'components.Input.error.validation.required' };

  mapKeys(inputValidations, (validationValue, validationKey) => {
    switch (validationKey) {
      case 'max':
        if (parseInt(value, 10) > validationValue) {
          errors.push("Can't be superior");
        }
        break;
      case 'maxLength':
        if (value.length > validationValue) {
          errors.push('Too long');
        }
        break;
      case 'min':
        if (parseInt(value, 10) < validationValue) {
          errors.push("Can't be inferior");
        }
        break;
      case 'minLength':
        if (value.length < validationValue) {
          errors.push('Too short');
        }
        break;
      case 'required':
        if (value.length === 0) {
          errors.push('The value is required');
        }
        break;
      case 'regex':
        if (!new RegExp(validationValue).test(value)) {
          errors.push('Does not match');
        }
        break;
      default:
        errors = [];
    }
  });

  if (type === 'email' && !emailRegex.test(value)) {
    errors.push('Not an email');
  }

  if (includes(errors, requiredError)) {
    errors = reject(errors, error => error !== requiredError);
  }

  return errors;
};

export default validateInput;
