import gql from 'graphql-tag';

export const GET_PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      _id
      name
      description
    }
  }
`;
