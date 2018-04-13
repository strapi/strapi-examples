/**
 *
 * ProductDetailsPage
 */

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_PRODUCT } from '../../queries';

const ProductDetailsPage = (props) => {
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
            {Object.keys(data).map((value, key) => (
              <div key={key}>
                <h1>
                  {data[value].name}
                </h1>
                <div style={styles.linkWrapper}>
                  <Link to="/products">Go back to products page</Link>
                </div>
                {
                  Object.keys(data[value]).map((child, key) => {
                    // Display all the informations
                    return (
                      <div key={key}>
                        <ul>
                          <li>{child}: {data[value][child]}</li>
                        </ul>
                      </div>
                    );
                  })
                }
              </div>
            ))}
          </div>
        )
      }}
    </Query>
  );
}

const styles = {
  linkWrapper: {
    marginTop: '10px',
    marginBottom: '10px',
  },
};

export default ProductDetailsPage;
