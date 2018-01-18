import React from 'react'
import Link from 'gatsby-link'

const ArticleTemplate = ({ data }) => (
  <div>
    <h1>{data.strapiArticle.title}</h1>
    <p>
      by{' '}
      <Link to={`/authors/${data.strapiArticle.author.id}`}>
        {data.strapiArticle.author.username}
      </Link>
    </p>
    <p>{data.strapiArticle.content}</p>
  </div>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      content
      author {
        id
        username
      }
    }
  }
`
