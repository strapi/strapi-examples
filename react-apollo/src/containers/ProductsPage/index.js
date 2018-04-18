/**
 *
 * ProductsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_PRODUCTS } from '../../queries';

import Table from '../../components/Table';
// Utils

import './styles.scss';

class ProductsPage extends React.Component {
  state = { products: [] };

  onClick = (id) => {
    this.props.history.push(`/product/${id}`);
  }

  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {({ loading, error, data}) => {
          if (loading) {
            return null;
          }

          if (error) {
            return `Error: ${error}`;
          }

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
                    data={data.products}
                    headers={['_id', 'name', 'description', '']}
                    onClick={this.onClick}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

ProductsPage.defaultProps = {};

ProductsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ProductsPage;
