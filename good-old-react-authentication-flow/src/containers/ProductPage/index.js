/**
 *
 * ProductPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Utils
import request from '../../utils/request';

import './styles.scss';

class ProductPage extends React.Component {
  state = { products: [] };

  async componentDidMount() {
    const requestURL = 'http://localhost:1337/product';

    const products = await request(requestURL, { method: 'GET' });
    console.log('p', products);
  }

  render() {
    return (
      <div className="productPageWrapper">
        PropTypes
      </div>
    );
  }
}

ProductPage.defaultProps = {};
ProductPage.propTypes = {};

export default ProductPage;
