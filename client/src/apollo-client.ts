import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://217.154.9.148:3000/graphql',
  cache: new InMemoryCache(),
});

export default client;