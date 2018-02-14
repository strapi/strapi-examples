import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash';
import cn from 'classnames';

import './styles.css';

function InputErrors(props) {
  const divStyle = Object.assign({ display: 'block' }, props.style);

  return (
    <div>
      {map(props.errors, (error, key) => {

        return (
          <div className={cn(
              'form-control-feedback',
              'invalid-feedback',
              'errorContainer',
              !isEmpty(props.className) && props.className,
            )}
            key={key}
            style={divStyle}
            >
            {error}
          </div>
        )
      })}
    </div>
  );
}

InputErrors.defaultProps = {
  className: '',
  errors: [],
  style: {},
};

InputErrors.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.array,
  style: PropTypes.object,
};

export default InputErrors;
