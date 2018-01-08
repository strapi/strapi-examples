/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, upperFirst } from 'lodash';

import './styles.scss';

/* eslint-disable react/require-default-props */
function Button(props) {
  const buttonProps = Object.assign({}, props);
  const propsToDelete = ['primary'];

  propsToDelete.map((value) => delete buttonProps[value]);

  const label = !isEmpty(props.label) && !props.children ? <span>{props.label}</span> : props.children;
  return (
    <button
      className={`button ${props.primary ? 'primary' : ''}`}
      type={props.type || 'button'}
      {...buttonProps}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  label: PropTypes.string,
  primary: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
