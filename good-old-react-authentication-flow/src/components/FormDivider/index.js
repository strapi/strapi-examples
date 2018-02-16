/**
 *
 * FormDivider
 *
 */

import React from 'react';
import './styles.css';

function FormDivider() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="or-container">
          <hr className="or-hr" />
          <div className="or-div">OR</div>
        </div>
      </div>
    </div>
  );
}

FormDivider.propTypes = {};

export default FormDivider;
