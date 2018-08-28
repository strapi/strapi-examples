import { graphql } from 'react-apollo'
import uploadsQuery from '../queries/uploads'
import { Table, Head, Cell } from './table'

const Uploads = ({ data: { files = [] } }) => (
  <Table
    thead={
      <tr>
        <Head>Filename</Head>
        <Head>MIME type</Head>
        <Head>URL</Head>
      </tr>
    }
    tbody={files.map(({ id, name, mime, url }) => (
      <tr key={id}>
        <Cell>{name}</Cell>
        <Cell>{mime}</Cell>
        <Cell>{url}</Cell>
      </tr>
    ))}
  />
)

export default graphql(uploadsQuery)(Uploads)
