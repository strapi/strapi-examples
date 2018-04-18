/**
 *
 * TableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const TableEmpty = ({ colSpan }) => {
  return (
    <tr className="tableEmpty">
      <td colSpan={colSpan}>There is no product...</td>
    </tr>
  );
}

TableEmpty.defaultProps = {
  colSpan: 0,
};

TableEmpty.propTypes = {
  colspan: PropTypes.number,
};

export default TableEmpty;
