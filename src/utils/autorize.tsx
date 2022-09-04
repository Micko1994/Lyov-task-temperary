import { ReactNode } from 'react';
import { SignIn } from 'pages';
import { useStore } from 'store';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';

const errorLink = onError(({ graphQLErrors }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }: GraphQLError) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: 'https://api.github.com/graphql' })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

type TAuthorize = {
  children: ReactNode;
};

export const Authorize = ({ children }: TAuthorize) => {
  const {
    state: { isLoggedIn },
  } = useStore();
  const hasAuth = !!localStorage.getItem('tokenObj');
  return isLoggedIn || hasAuth ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : (
    <SignIn />
  );
};
