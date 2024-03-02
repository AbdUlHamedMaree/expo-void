import { createClient } from 'graphql-ws';

import { storage } from '$libs/async-storage/storage';

export const graphqlWsClient = createClient({
  url:
    process.env.EXPO_PUBLIC_API_WS_PROTOCOL +
    '//' +
    process.env.EXPO_PUBLIC_API_HOST +
    process.env.EXPO_PUBLIC_API_GRAPHQL_PATHNAME,
  connectionParams: async () => {
    const accessToken = await storage.accessToken.get();

    if (!accessToken) return;

    return {
      Authorization: `Bearer ${await storage.accessToken.get()}`,
    };
  },
});
