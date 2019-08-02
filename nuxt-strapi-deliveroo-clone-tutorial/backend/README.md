## Install and start Strapi:

1. Navigate to your `./Projects` folder and clone this repository. Then navigate to the `/nuxt-strapi-deliveroo-clone-tutorial` directory

`Path: ./Projects`

```bash
git clone https://github.com/strapi/strapi-examples.git
cd strapi-examples/nuxt-strapi-deliveroo-clone-tutorial

```

2. Start and configure Strapi by following these steps:

`Path: ./Projects/strapi-examples/nuxt-strapi-deliveroo-clone-tutorial`

- Install, build and start Strapi with the following:

```bash
cd backend
yarn && yarn build
yarn develop
```

- Navigate to [http://localhost:1337/admin](http://localhost:1337/admin) and register your **Administrator** role.
- Inside the **Strapi Administration Dashboard**, navigate to **Roles and Permissions** in the left-hand menu under **PLUGINS**.
- Allow access to the `Public` API. Click on **Public**, then for **Dishes** and **Restaurant** - check `find` and `findone`. And then hit the blue **Save** button.
- Allow access to the `Authenticated` API. Click on **Authenticated**, then for **Dishes**, **Order** and **Restaurant** - check `find` and `findone`. And then hit the blue **Save** button.

Strapi is nearly ready, you just need to add a little content.

3. Add Content to the project.

You can input your own unique content or download the sample content for the steps below, from here: [Sample Content](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial/sample-content)

- Add two **Restaurants** by clicking on the **CONTENT TYPE** `Restaurant` in the left-hand menu, under **CONTENT TYPES**.

The sample content has two **Restaurants** including two **Dishes** for each of them:

**Restaurant #1**: `Best Hamburger Joint Period`

**Restaurant #2**: `Authentic Fried Chicken`

The `.txt` has self-explanatory content for the **Restaurnt** Content Type entries.

- Next, add two dishes for each of the **Restaurants**.

- For each **Dish**, you will enter a `Name`, `Description`, `Price` and upload an `image`. You will also need to attach each **Dish** to their appropriate **Restaurant**.

After allowing access to the API and inputting content, you are ready to install and start the **Nuxt Client**.
