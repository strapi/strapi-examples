/**
 *
 * ImgPreviewHint
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function ImgPreviewHint(props) {

  let pStyle;

  switch (true) {
    case props.showWhiteHint:
      pStyle = { zIndex: 999, color: '#fff' };
      break;
    case props.displayHint:
      pStyle = { zIndex: 4 };
      break;
    default:
      pStyle = { display: 'none' };
  }

  const browse = <u onClick={props.onClick}>browse</u>;

  return (
    <p className="imgPreviewHint" style={pStyle} onDragEnter={(e) => e.stopPropagation()} onDrop={props.onDrop}>
      <span>Drag & drop or {browse} for a file to upload</span>
    </p>
  );
}

ImgPreviewHint.defaultProps = {
  displayHint: false,
  showWhiteHint: false,
};

ImgPreviewHint.propTypes = {
  displayHint: PropTypes.bool,
  showWhiteHint: PropTypes.bool,
};

export default ImgPreviewHint;
