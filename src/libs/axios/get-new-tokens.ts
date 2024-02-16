import { graphqlRequest } from './graphql';

import { graphql } from '$gql';
import { storage } from '$libs/async-storage/storage';

const getNewTokensDocument = graphql(`
  mutation GetNewTokens {
    getNewTokens {
      accessToken
      refreshToken
    }
  }
`);

export const getNewTokensRequest = async () => {
  const refreshToken = await storage.refreshToken.get();

  return graphqlRequest(getNewTokensDocument, undefined, {
    headers: { Authorization: `Bearer ${refreshToken}` },
    __refreshTokenRequest: true,
  });
};
