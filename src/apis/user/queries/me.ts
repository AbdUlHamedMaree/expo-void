import { gql } from '$gql';

export const meDocument = gql(`
  query MeQuery {
    me {
      id
      email
      name
      phone
      role
      status
    }
  }
`);
