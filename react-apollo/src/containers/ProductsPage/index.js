/**
 *
 * ProductsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import Table from '../../components/Table';
// Utils
import request from '../../utils/request';

import './styles.scss';

class ProductsPage extends React.Component {
  state = { products: [] };

  async componentDidMount() {
    const requestURL = 'http://localhost:1337/product';

    try {
      const products = await request(requestURL, { method: 'GET' });
      this.setState({ products });

    } catch(err) {
      // silent
    }
  }

  onClick = (id) => {
    this.props.history.push(`/product/${id}`);
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
              <Link to="form/product/create">Create a product</Link>
            </div>
          </div>
          <div className="row">
            <Table
              data={this.state.products}
              headers={['id', 'name', 'description', '']}
              onClick={this.onClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProductsPage.defaultProps = {};

ProductsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ProductsPage;
