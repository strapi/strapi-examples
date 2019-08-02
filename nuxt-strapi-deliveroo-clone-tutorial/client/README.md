## Install and start the **Nuxt Client**:

- Keep Strapi running, or restart Strapi with either `yarn dev` or `yarn start`.

(**NOTE:** You will not be able to test making an order unless you have configured your [Stripe Token](https://stripe.com/docs/stripe-js/elements/payment-request-button#using-with-connect), **pk_test** token. Search and replace **pk_test_stripe** with your Stripe API token found in the ./pages/checkout.vue file.)

- Open another terminal window and navigate to `Path: ./Projects/strapi-examples/nuxt-strapi-deliveroo-clone-tutorial`.

```
cd client
yarn
```

If you would like to serve in development mode with hot reloading on [http://localhost:3000](http://localhost:3000).

```
yarn dev
```

You will now be able to test the functionality of this demonstration app using Strapi and Nuxt.

**NOTE:** If you would like to actually serve it on a production server, follow these commands instead.

```
yarn build
yarn start

```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
