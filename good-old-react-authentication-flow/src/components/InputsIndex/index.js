/**
 *
 * InputsIndex references all the input with errors available
 */

import React from 'react';
import PropTypes from 'prop-types';

// Design
import InputCheckboxWithErrors from '../../components/InputCheckboxWithErrors';
import InputEmailWithErrors from '../../components/InputEmailWithErrors';
import InputPasswordWithErrors from '../../components/InputPasswordWithErrors';
import InputTextWithErrors from '../../components/InputTextWithErrors';

const DefaultInputError = ({ type }) => (
  <div>
    Your input type: <b>{type}</b> does not exist
  </div>
);

const inputs = {
  checkbox: InputCheckboxWithErrors,
  email: InputEmailWithErrors,
  password: InputPasswordWithErrors,
  string: InputTextWithErrors,
  text: InputTextWithErrors,
};

function InputsIndex(props) {
  const inputValue =
    props.type === 'checkbox' || props.type === 'toggle'
      ? props.value || false
      : props.value || '';
  const Input = inputs[props.type] ? inputs[props.type] : DefaultInputError;

  return <Input {...props} value={inputValue} />;
}

InputsIndex.defaultProps = {};

InputsIndex.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InputsIndex;
