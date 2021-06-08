import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client';

const TOKEN = 'token';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history.replace();
};

export const darkModeVar = makeVar(false);

// todo kbt : understanding httpLink!!
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

export const client = new ApolloClient({
  // url: 'http://localhost:4000/graphql',
  link: httpLink,
  cache: new InMemoryCache(),
});
