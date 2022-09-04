import { ReactNode } from 'react';

import { SignIn } from 'pages';
import { useStore } from 'store';

// Apollo
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors }: any) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }: any) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.github.com/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

type Props = {
  children: ReactNode;
};

export const Autorize = ({ children }: Props): any => {
  const {
    state: { isLoggedIn },
  } = useStore();
  const hasAuth = !!localStorage.getItem('tokenObj');
return isLoggedIn || hasAuth ? <ApolloProvider client={client}>{children}</ApolloProvider> : <SignIn />;
};
