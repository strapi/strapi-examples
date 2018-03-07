/**
*
* Table
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import TableEmpty from '../TableEmpty';

import './styles.scss';

const Table = (props) => {
  return (
    <table className="table tableWrapper">
      <TableHeader
        headers={props.headers}
      />
      <tbody>
        {props.data.length === 0 && <TableEmpty colSpan={props.headers.length} />}
        {props.data.length !== 0 &&
          props.data.map((value, key) => (
            <TableRow
              data={value}
              key={key}
              headers={props.headers}
              onClick={props.onClick}
            />
          )
        )}
      </tbody>
    </table>
  );

}

Table.defaultProps = {
  data: [],
  header: [],
  onClick: () => {},
};

Table.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
  onClick: PropTypes.func,
};


export default Table;
