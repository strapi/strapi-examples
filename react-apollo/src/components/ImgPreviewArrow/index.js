/**
 *
 * ImgPreviewArrow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './styles.scss';

function ImgPreviewArrow(props) {
  let divStyle = props.show ? {} : { display: 'none' };

  if (props.enable) {
    divStyle = { zIndex: 99999 };
  }

  return (
    <div
      className={cn(
        'arrowContainer',
        props.type === 'left' && 'arrowLeft',
        props.type !== 'left' && 'arrowRight',
      )}
      style={divStyle}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onClick(props.type);
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  )
}

ImgPreviewArrow.defaultProps = {
  enable: false,
  onClick: () => {},
  show: false,
  type: 'left',
};

ImgPreviewArrow.propTypes = {
  enable: PropTypes.bool,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.string,
};

export default ImgPreviewArrow;
