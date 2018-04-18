import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import cn from 'classnames';

import './styles.css';

function Label(props) {
  let content = props.children;

  if (typeof props.message === 'string') {
    content = props.message;
  }

  if (isFunction(props.message)) {
    content = props.message();
  }

  return (
    <label
      className={cn('label', props.className)}
      htmlFor={props.htmlFor}
      style={props.style}
    >
      {content}
    </label>
  );
}

Label.defaultProps = {
  children: '',
  className: '',
  htmlFor: '',
  message: '',
  style: {},
};

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  style: PropTypes.object,
};

export default Label;
