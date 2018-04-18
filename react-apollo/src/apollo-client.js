import { ApolloLink } from 'apollo-client-preset';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import auth from './utils/auth';

const httpLink = new HttpLink({ uri: `http://localhost:1337/graphql` });

// Middleware to set the headers
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = auth.getToken();
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  })
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);
// Disable cache so it reflects the updates
// If you're just displaying data and not mutating them you can remove it
// to increase performances
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
})

export default client;
