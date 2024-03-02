import { loginDocument } from './mutations/login';
import { signUpDocument } from './mutations/sign-up';
import { meDocument } from './queries/me';

import { createApolloCRUDEntity } from '$libs/apollo-client-react-crud/create-apollo-crud-entity';

export const {
  queries: [useMeQuery],
  mutations: [useLoginMutation, useSignUpMutation],
} = createApolloCRUDEntity(meDocument)(loginDocument, signUpDocument);
