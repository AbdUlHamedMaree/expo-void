import { graphqlRequest } from './graphql';

import { gql } from '$gql';
import { storage } from '$libs/async-storage/storage';

const getNewTokensDocument = gql(`
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
