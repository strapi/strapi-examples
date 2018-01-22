# React Authentication Flow

Basic React application that shows how the authenticate users using `JSON Web Tokens`.

## Setup

**1 —** Clone the repository.
```bash
git clone git@github.com:strapi/strapi-examples.git
```

**2 —** Go to the `login-react` example folder and install the front-end app dependencies.
```bash
cd login-react/react-login-front-end-app
npm install
```

**3 —** Start the front-end app server.
```bash
npm start
```
[Open the app in your browser](http://localhost:3000)

**4 -** In a new terminal window start mongo to register your first user
```bash
mongod
```

**5 -** Go to the API app and start the server
```bash
cd login-react/strapi-api/login
strapi start
```

**6 -** [Create the Admin user](http://localhost:1337/admin/plugins/users-permissions/auth/register) by registering your first user.

## Front-end App Architecture

We use the [React boilerplate](https://github.com/react-boilerplate/react-boilerplate) architecture to implement the authentication flow.

### Routing

We have 3 containers associated with routes :
- HomePage and AuthPage which are accessible without being logged in.
- SecurePage that is accessible only if the user is logged in.

> [Check out the routing](./react-login-front-end-app/app/containers/App/index.js)

### Protecting a route

In the example, only logged in users can access the [SecurePage](./react-login-front-end-app/app/containers/SecurePage/index.js) container. To do so we have a React Higher Order Component [ProtectedRoute](./react-login-front-end-app/app/containers/ProtectedRoute/index.js) that checks if the user is logged in before accessing the route and redirects him to the [AuthPage container](./react-login-front-end-app/app/containers/AuthPage/index.js) if he is not.


With this HoC it's really easy to prevent a user from accessing a protected route for example:

**In your route declaration** `./containers/App/index.js`
```js
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// HoC that blocks the navigation if the user is not logged in
import ProtectedRoute from 'containers/ProtectedRoute';
import FooPage from 'containers/FooPage';

export default function App() {
  return (
    <Switch>
      <ProtectedRoute exact path="/foo" component={FooPage} />
    </Switch>
  );
}

```
