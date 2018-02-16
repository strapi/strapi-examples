import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isFunction } from 'lodash';
import cn from 'classnames';

import './styles.css';

function InputDescription(props) {
  let content = props.children;

  if (typeof props.message === 'string') {
    content = props.message;
  }

  if (isFunction(props.message)) {
    content = props.message();
  }
  return (
    <div
      className={cn(
        'inputDescriptionContainer',
        !isEmpty(props.className) && props.className
      )}
      style={props.style}
    >
      <small>{content}</small>
    </div>
  );
}

InputDescription.defaultProps = {
  children: '',
  className: '',
  message: '',
  style: {},
};

InputDescription.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  style: PropTypes.object,
};

export default InputDescription;
