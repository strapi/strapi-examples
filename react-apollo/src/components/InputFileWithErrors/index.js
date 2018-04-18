/**
 *
 * InputFileWithErrors
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { differenceBy, isEmpty } from 'lodash';

// Design
import Label from '../Label';
import InputDescription from '../InputDescription';
import InputFile from '../InputFile';

import './styles.scss';

class InputFileWithErrors extends React.Component {
  state = { label: false, hasValue: false };

  componentDidMount() {
    if (this.props.multiple && !isEmpty(this.props.value)) {
      this.setState({ label: 1, hasValue: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.hasValue && !isEmpty(nextProps.value) && nextProps.multiple && differenceBy(nextProps.value, this.props.value, 'name').length > 0) {
      this.setState({ label: 1, hasValue: true });
    }
  }

  setLabel = (label) => {
    this.setState({ label });
  }
  // TODO handle errors lifecycle
  render() {
    const {
      className,
      customBootstrapClass,
      inputDescription,
      inputDescriptionClassName,
      inputDescriptionStyle,
      label,
      labelClassName,
      labelStyle,
      multiple,
      name,
      onChange,
      style,
      value,
    } = this.props;

    const labelClass = labelClassName === '' ? 'labelFile' : labelClassName;
  
    return (
      <div
        className={cn(
          'inputFileWithErrorsContainer',
          customBootstrapClass,
          className !== '' && className,
        )}
        style={style}
      >
        <div className="labelContainer">

          <Label
            className={labelClass}
            htmlFor={`${name}NotNeeded`}
            message={label}
            style={labelStyle}
          />
          { this.state.label && (
            <span className="labelNumber">&nbsp;({this.state.label}/{value.length})</span>
          )}
        </div>
        <InputFile
          multiple={multiple}
          name={name}
          onChange={onChange}
          setLabel={this.setLabel}
          value={value}
        />
        <InputDescription
          className={inputDescriptionClassName}
          message={inputDescription}
          style={inputDescriptionStyle}
        />
      </div>
    );
  }
}

InputFileWithErrors.defaultProps = {
  className: '',
  customBootstrapClass: 'col-md-6',
  inputDescription: '',
  inputDescriptionClassName: '',
  inputDescriptionStyle: {},
  label: '',
  labelClassName: '',
  labelStyle: {},
  multiple: false,
  style: {},
  value: [],
};

InputFileWithErrors.propTypes = {
  className: PropTypes.string,
  customBootstrapClass: PropTypes.string,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  inputDescriptionClassName: PropTypes.string,
  inputDescriptionStyle: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  labelClassName: PropTypes.string,
  labelStyle: PropTypes.object,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default InputFileWithErrors;
