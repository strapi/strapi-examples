# Login Flow Example

Basic app that shows how to implement login with a third party login provider.

## Setup

**1 —** Clone this repository and install the dependencies
```bash
git clone git@github.com:strapi/strapi-examples.git
cd strapi-examples/login-react/react-login-front-end-app
yarn install
```

**2 —** Install a Strapi backend

In a another folder, run these commands:
```bash
yarn create strapi-app my-project --quickstart
# or
npx create-strapi-app my-project --quickstart
```

**3 —** Create the Admin user: http://localhost:1337/admin/auth/register

**4 —** Configure one or several providers by following the instructions there: https://strapi.io/documentation/v3.x/plugins/users-permissions.html#providers
