import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const getGraphQLUri = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:8787/graphql';
  }
  
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname === '';
  
  return isLocalhost 
    ? 'http://localhost:8787/graphql'
    : 'https://meadery.win/api/graphql';
};

const httpLink = createHttpLink({
  uri: getGraphQLUri(),
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});