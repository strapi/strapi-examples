# API Strapi Delivroo clone


### Install dependencies
```bash
$ yarn
```

### Run the server
```bash
$ yarn dev
```

### build for production and launch server
```bash
$ yarn build
$ yarn start
```

### Permissions configuration

For the **Public** role:
- Application
  - Resaurant
    - find
    - findone
  - Dish
    - find

For the **Authenticated** role:
- Application
  - Resaurant
    - find
    - findone
  - Dish
    - find
  - Order
    - create

---

For detailed explanation on how things work, checkout the [Strapi docs](https://github.com/nuxt/strapi).