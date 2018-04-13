/**
 *
 * TableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { get, isArray, isEmpty, startsWith } from 'lodash';
import { Link } from 'react-router-dom';

// import IcoContainer from 'components/IcoContainer';

import './styles.scss';


const TableRow = (props) => {
  return (
    <tr
      className="tableRow"
      onClick={(e) => {
        // Handle navigation to EditPage container
        e.preventDefault();
        e.stopPropagation();
        props.onClick(props.data.id);
      }}
    >
      {props.headers.map(header => {
        if (header === 'pictures' && !isEmpty(props.data[header])) {
          // Get the first pictures for display
          const picture = isArray(props.data[header]) ? get(props.data, [header, '0', 'url'], '') : get(props.data, ['header', 'url'], '');
          // check if we need to add the strapiBackendURL if the upload provider is local
          const src = startsWith(picture, '/') ? `http://localhost:1337${picture}` : picture;

          return (
            <td key={header}>
              <img src={src} alt={props.data[header].name} />
            </td>
          );
        }

        // Prepare for actions
        if (header === '') {
          return (
            <td key={header} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation();
            }}>
              <Link to={`/form/product/${props.data.id}`}>Edit</Link>
            </td>
          );
        }

        return (
          <td key={header}>
            {props.data[header]}
          </td>
        );
      })}
    </tr>
  );
}

TableRow.defaultProps = {
  data: {},
  headers: [],
  onClick: (e) => {
    e.preventDefault();
    console.log('click');
  },
};

TableRow.propTypes = {
  data: PropTypes.object,
  headers: PropTypes.array,
  onClick: PropTypes.func,
};
export default TableRow;
