import { createClient } from 'graphql-ws';

export const graphqlWsClient = createClient({
  url:
    process.env.EXPO_PUBLIC_API_WS_PROTOCOL +
    '//' +
    process.env.EXPO_PUBLIC_API_HOST +
    process.env.EXPO_PUBLIC_API_GRAPHQL_PATHNAME,
});
