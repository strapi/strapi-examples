/**
 *
 * InputCheckbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isFunction } from 'lodash';
import cn from 'classnames';

import './styles.css';

class InputCheckbox extends React.Component {
  handleChange = () => {
    const target = {
      name: this.props.name,
      type: 'checkbox',
      value: !this.props.value,
    };

    this.props.onChange({ target });
  }

  render() {
    const {
      autoFocus,
      className,
      disabled,
      label,
      name,
      onBlur,
      onFocus,
      style,
      tabIndex,
      value,
    } = this.props;
    const checkbox = (
      <input
        autoFocus={autoFocus}
        className="form-check-input"
        checked={value}
        disabled={disabled}
        id={name}
        onBlur={onBlur}
        onChange={this.handleChange}
        onFocus={onFocus}
        tabIndex={tabIndex}
        type="checkbox"
      />
    );

    let content = <div />;

    if (typeof(label) === 'string') {
      content = (
        <label className={cn('form-check-label', 'labelCheckbox', disabled && 'disabled')} htmlFor={name}>
          {checkbox}
          {label}
        </label>
      );
    }

    if (isFunction(label)) {
      content = (
        <label className={cn('form-check-label', disabled && 'disabled')} htmlFor={name}>
          {checkbox}
          {label()}
        </label>
      );
    }

    return (
      <div className={cn(
          'form-check',
          'inputCheckbox',
          !isEmpty(className) && className,
        )}
        style={style}
      >
        {content}
      </div>
    );
  }
}

InputCheckbox.defaultProps = {
  autoFocus: false,
  className: '',
  disabled: false,
  label: '',
  onBlur: () => {},
  onFocus: () => {},
  style: {},
  tabIndex: '0',
  value: false,
};

InputCheckbox.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  value: PropTypes.bool,
};

export default InputCheckbox;
