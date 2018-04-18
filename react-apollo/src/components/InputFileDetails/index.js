/**
 *
 * InputFileDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { get, startsWith } from 'lodash';

import './styles.scss';

function InputFileDetails(props) {
  if (props.number === 0 && props.multiple) {
    return <div />;
  }

  // TODO improve logic
  if (!get(props.file, 'name') && !props.multiple) {
    return <div />
  }

  const url = startsWith(props.file.url, '/') ? `http://localhost:1337${props.file.url}` : props.file.url;

  return (
    <div className="inputFileDetails">
      <div className="detailBanner">
        <div>
          {props.file.url && (
            <a href={url} className="externalLink" target="_blank">
              <i className="fas fa-external-link-square-alt" />
              <span style={{ fontSize: '13px' }}>Open in a new tab</span>
            </a>
          )}
        </div>
        <div className="removeContainer" onClick={props.onFileDelete}>
          <span style={{ fontSize: '13px' }}>Remove file</span>
        </div>
      </div>
    </div>
  );
}

InputFileDetails.defaultProps = {
  file: {},
  multiple: false,
  number: 0,
  onFileDelete: () => {},
};

InputFileDetails.propTypes = {
  file: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  multiple: PropTypes.bool,
  number: PropTypes.number,
  onFileDelete: PropTypes.func,
};

export default InputFileDetails;
