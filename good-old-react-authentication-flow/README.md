# React create app boilerplate

This boilerplate has all the authentication flow implemented.

``` bash
cd good-old-react-authentication-flow
npm install
npm start
```


## Testing the upload feature

In your Strapi project run the following:

```bash
strapi generate:api product
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
    "pictures": {
      "collection": "file",
      "via": "related",
      "plugin": "upload"
    }
  }
}
```
Register the admin user in strapi and you're good to go.
