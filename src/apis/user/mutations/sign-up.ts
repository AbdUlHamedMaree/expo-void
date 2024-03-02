import { gql } from '$gql';

export const signUpDocument = gql(`
  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {
    signup(payload: $signUpPayload) {
      id
    }
  }
`);
