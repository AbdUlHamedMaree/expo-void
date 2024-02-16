import { loginDocument } from './mutations/login';
import { signUpDocument } from './mutations/sign-up';
import { meDocument } from './queries/me';

import { createGraphQLCRUDEntity } from '$libs/graphql-react-query/create-graphql-crud-entity';

export const {
  queries: [useMeQuery],
  mutations: [useLoginMutation, useSignUpMutation],
} = createGraphQLCRUDEntity(meDocument)(loginDocument, signUpDocument);
