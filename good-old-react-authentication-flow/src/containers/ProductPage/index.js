/**
 *
 * ProductPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/Table';
// Utils
import request from '../../utils/request';

import './styles.scss';

class ProductPage extends React.Component {
  state = { products: [] };

  async componentDidMount() {
    const requestURL = 'http://localhost:1337/product';

    const products = await request(requestURL, { method: 'GET' });
    this.setState({ products });
  }

  render() {
    return (
      <div className="productPageWrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h1>Products</h1>
            </div>
            <div className="col-md-4 offset-md-4 productPageLink">
              Create a Product
            </div>
          </div>
          <div className="row">
            <Table
              data={this.state.products}
              headers={['id', 'name', 'pictures', '']}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProductPage.defaultProps = {};
ProductPage.propTypes = {};

export default ProductPage;
