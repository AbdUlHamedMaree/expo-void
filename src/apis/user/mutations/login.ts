import { gql } from '$gql';

export const loginDocument = gql(`
  mutation LoginMutation($loginPayload: LoginPayloadIt!) {
    login(payload: $loginPayload) {
      accessToken
      refreshToken
    }
  }
`);
