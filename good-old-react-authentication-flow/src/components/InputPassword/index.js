/**
 *
 * InputPassword
 *
 */

/* eslint-disable no-mixed-operators */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import cn from 'classnames';

import './styles.css';

class InputPassword extends React.Component {
  state = { showPassword: false };

  handleClick = () => this.setState({ showPassword: !this.state.showPassword });

  render() {
    const {
      autoFocus,
      className,
      deactivateErrorHighlight,
      disabled,
      error,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      style,
      tabIndex,
      value,
    } = this.props;

    const eyeColor = this.state.showPassword ? { color: 'black' }  : { color: '#9EA7B8' };

    return (
      <Fragment>
          <input
            autoComplete="new-password"
            autoFocus={autoFocus}
            className={cn(
              'inputPassword',
              'form-control',
              !deactivateErrorHighlight && error && 'is-invalid',
              !isEmpty(className) && className,
            )}
            disabled={disabled}
            id={name}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            style={style}
            tabIndex={tabIndex}
            type={!this.state.showPassword && 'password' || 'text'}
            value={value}
          />
        <div className="iconEyeWrapper">
          <div className="iconEyeSubWrapper" onClick={this.handleClick} style={eyeColor}>
            <i className="fa fa-eye" />
          </div>
        </div>
      </Fragment>
    );
  }
}

InputPassword.defaultProps = {
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

InputPassword.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default InputPassword;
