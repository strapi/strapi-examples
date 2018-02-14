/**
 *
 * InputEmail
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import cn from 'classnames';

import './styles.css';

class InputEmail extends React.Component {
  state = { isFocused: false };

  handleBlur = (e) => {
    this.setState({ isFocused: !this.state.isFocused });
    this.props.onBlur(e);
  }

  handleFocus = (e) => {
    this.setState({ isFocused: !this.state.isFocused });
    this.props.onFocus(e);
  }

  render() {
    const {
      autoFocus,
      className,
      deactivateErrorHighlight,
      disabled,
      error,
      name,
      onChange,
      placeholder,
      style,
      tabIndex,
      value,
    } = this.props;

    return (
      <div className={cn('inputEmailContainer', 'input-group', !isEmpty(className) && className)} style={style}>
        <span className={cn(
            'input-group-addon',
            'addonEmail',
            this.state.isFocused && 'addonFocus',
            !deactivateErrorHighlight && error && 'errorAddon',
          )}
        />
        <input
          autoFocus={autoFocus}
          className={cn(
            'form-control',
            'inputEmail',
            !deactivateErrorHighlight && error && 'is-invalid',
            !deactivateErrorHighlight && error && this.state.isFocused && 'invalidEmail',
          )}
          disabled={disabled}
          id={name}
          name={name}
          onBlur={this.handleBlur}
          onChange={onChange}
          onFocus={this.handleFocus}
          placeholder={placeholder}
          tabIndex={tabIndex}
          type="email"
          value={value}
        />
      </div>
    );
  }
}

InputEmail.defaultProps = {
  autoFocus: false,
  className: '',
  deactivateErrorHighlight: false,
  disabled: false,
  error: false,
  onBlur: () => {},
  onFocus: () => {},
  placeholder: '',
  style: {},
  tabIndex: '0',
};

InputEmail.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default InputEmail;
