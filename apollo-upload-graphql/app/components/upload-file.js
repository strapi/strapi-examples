import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import uploadsQuery from '../queries/uploads'

const UploadFile = ({ mutate }) => {
  const handleChange = ({
    target: {
      validity,
      files: [file],
    }
  }) =>
    validity.valid &&
    mutate({
      variables: { file, ref: 'Toto' },
      update(
        proxy,
        {
          data: { upload }
        }
      ) {
        const data = proxy.readQuery({ query: uploadsQuery })
        data.files.push(upload)
        proxy.writeQuery({ query: uploadsQuery, data })
      }
    })

  return <input type="file" required onChange={handleChange} />
}

export default graphql(gql`
  mutation($file: Upload!, $ref: String) {
    upload(file: $file, ref: $ref) {
      _id
      name
      mime
      url
      __typename
    }
  }
`)(UploadFile)
