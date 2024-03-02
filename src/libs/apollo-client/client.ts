import type { GraphQLRequest } from '@apollo/client';
import {
  ApolloClient,
  from,
  InMemoryCache,
  fromPromise,
  createHttpLink,
  split,
} from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

import { gql } from '$gql';
import { storage } from '$libs/async-storage/storage';
import { graphqlWsClient } from '$libs/graphql-ws/client';
// import { apolloDevToolsInit } from 'react-native-apollo-devtools-client';

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const getNewTokensDocument = gql(`
  mutation GetNewTokens {
    getNewTokens {
      accessToken
      refreshToken
    }
  }
`);

export const getAndSetNewAccessToken = async () => {
  try {
    const refreshResolverResponse = await apolloClient.mutate({
      mutation: getNewTokensDocument,
    });

    const accessToken = refreshResolverResponse.data?.getNewTokens.accessToken;

    await storage.accessToken.set(accessToken);

    return accessToken;
  } catch (err) {
    await storage.accessToken.delete();
    throw err;
  }
};

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error(operation.operationName, err);
        if (err.extensions.code === 'UNAUTHENTICATED') {
          if (operation.operationName === 'GetNewTokens') {
            return;
          }

          return fromPromise(getAndSetNewAccessToken()).flatMap(() => forward(operation));
        }
      }
    }

    if (networkError) console.error(operation.operationName, networkError);
  }
);

export const isRefreshRequest = (operation: GraphQLRequest) => {
  return operation.operationName === 'GetNewTokens';
};

export const returnTokenDependingOnOperation = (operation: GraphQLRequest) => {
  if (isRefreshRequest(operation)) return storage.refreshToken.get();
  else return storage.accessToken.get();
};

export const authLink = setContext(async (operation, { headers }) => {
  const token = await returnTokenDependingOnOperation(operation);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const httpLink = createHttpLink({
  uri:
    process.env.EXPO_PUBLIC_API_HTTP_PROTOCOL +
    '//' +
    process.env.EXPO_PUBLIC_API_HOST +
    process.env.EXPO_PUBLIC_API_GRAPHQL_PATHNAME,
});

const wsLink = new GraphQLWsLink(graphqlWsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache(),
});

// if (__DEV__) {
//   apolloDevToolsInit(apolloClient);
// }
