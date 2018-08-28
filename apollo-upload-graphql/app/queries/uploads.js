import gql from 'graphql-tag'

export default gql`
  query files {
    files {
      _id
      name
      mime
      url
      __typename
    }
  }
`
