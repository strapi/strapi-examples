/**
 *
 * ProductDetailsPage
 */

import React from 'react';
import { Query } from 'react-apollo';

import { GET_PRODUCT } from '../../queries';

const ProductDetailsPage = (props) => {
  // console.log(props)
  const { match: { params: { id } } } = props;
  return (
    <Query query={GET_PRODUCT} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return null;
        }
        if (error) {
          return `Error: ${error}`;
        }

        return (
          <div>
            {data.product.name}
          </div>
        )
      }}
    </Query>
  );
}

export default ProductDetailsPage;
