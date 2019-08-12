# Cooking a Deliveroo clone with Nuxt (Vue.js), GraphQL, Strapi and Stripe

## Introduction

This is an updated version of the example from the tutorial series "[Cooking a Deliveroo clone with Nuxt (Vue.js), GraphQL, Strapi and Stripe](https://blog.strapi.io/cooking-a-deliveroo-clone-with-nuxt-vue-js-graphql-strapi-and-stripe-setup-part-1-7)".

You may use this repo to compare your code against this version which has been tested in the Beta version of Strapi.

You may see the live version by following the next steps:

## Install and start Strapi:

1. Navigate to your `./Projects` folder and clone this repository. Then navigate to the `/nuxt-strapi-deliveroo-clone-tutorial` directory

`Path: ./Projects`

```bash
git clone https://github.com/strapi/strapi-examples.git
cd strapi-examples/nuxt-strapi-deliveroo-clone-tutorial

```

2. Start and configure Strapi by following these steps:

`Path: ./Projects/strapi-examples/nuxt-strapi-deliveroo-clone-tutorial`

-   Install, build and start Strapi with the following:

```bash
cd backend
yarn && yarn build
yarn develop
```

-   Navigate to [http://localhost:1337/admin](http://localhost:1337/admin) and register your **Administrator** role.
-   Inside the **Strapi Administration Dashboard**, navigate to **Roles and Permissions** in the left-hand menu under **PLUGINS**.
-   Allow access to the `Public` API. Click on **Public**, then for **Dishes** and **Restaurant** - check `find` and `findone`. And then hit the blue **Save** button.
-   Allow access to the `Authenticated` API. Click on **Authenticated**, then for **Dishes**, **Order** and **Restaurant** - check `find` and `findone`. And then hit the blue **Save** button.

Strapi is nearly ready, you just need to add a little content.

3. Add Content to the project.

You can input your own unique content or download the sample content for the steps below, from here: [Sample Content](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial/sample-content)

-   Add two **Restaurants** by clicking on the **CONTENT TYPE** `Restaurant` in the left-hand menu, under **CONTENT TYPES**.

The sample content has two **Restaurants** including two **Dishes** for each of them:

**Restaurant #1**: `Best Hamburger Joint Period`

**Restaurant #2**: `Authentic Fried Chicken`

The `.txt` has self-explanatory content for the **Restaurnt** Content Type entries.

-   Next, add two dishes for each of the **Restaurants**.

-   For each **Dish**, you will enter a `Name`, `Description`, `Price` and upload an `image`. You will also need to attach each **Dish** to their appropriate **Restaurant**.

After allowing access to the API and inputting content, you are ready to install and start the **Nuxt Client**.

## Install and start the **Nuxt Client**:

-   Keep Strapi running, or restart Strapi with either `yarn dev` or `yarn start`.

(**NOTE:** You will not be able to test making an order unless you have configured your [Stripe Token](https://stripe.com/docs/stripe-js/elements/payment-request-button#using-with-connect), **pk_test** token. Search and replace **pk_test_stripe** with your Stripe API token found in the ./pages/checkout.vue file.)

-   Open another terminal window and navigate to `Path: ./Projects/strapi-examples/nuxt-strapi-deliveroo-clone-tutorial`.

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
