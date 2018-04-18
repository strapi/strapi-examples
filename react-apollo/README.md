# React Apollo

This boilerplate uses the GraphQL API when the GraphQL plugin is installed in your project.

``` bash
cd react-apollo
npm install
npm start
```

> ⚠️  Make sure you're using MongoDB as a database.


## Testing the upload feature

In your Strapi project run the following:

```bash
strapi generate:api product
strapi install graphql
```

then in your `/api/product/model/Product.settings.json` copy-paste the following:

```json
{
  "connection": "default",
  "collectionName": "",
  "info": {
    "name": "product",
    "description": ""
  },
  "attributes": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "text"
    }
  }
}
```
Register the admin user in Strapi and you're good to go.

## Fetching data

You can fetch data in two different ways (both are implemented)
- using the `<Query />` component (see the `ProductDetailsPage`)
- manually using the client that is exported (see the `EditPage`)

## Caching

The cache is disabled since `mutations` are not implemented yet, so if you need to mutate data you have to disable it for the moment.
This option is located in the `apollo-client.js` file.

## Posting data

Since mutations aren't available yet, we use the request helper.
