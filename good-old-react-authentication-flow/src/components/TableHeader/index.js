/**
 *
 * TableHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const TableHeader = ({ headers }) => {
  return (
    <thead className="tableHeader">
      <tr>
        {headers.map(header => (
          <th key={header}>
            <span>
              {header}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.defaultProps = {
  headers: [],
};

TableHeader.propTypes = {
  headers: PropTypes.array,
};

export default TableHeader;
