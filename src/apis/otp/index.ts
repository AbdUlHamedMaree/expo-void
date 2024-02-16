import { sendOTPDocument } from './mutations/send-otp';
import { verifyOTPDocument } from './mutations/verify-otp';

import { createGraphQLCRUDEntity } from '$libs/graphql-react-query/create-graphql-crud-entity';

export const {
  queries: _,
  mutations: [useSendOtpMutation, useVerifyOTPMutation],
} = createGraphQLCRUDEntity()(sendOTPDocument, verifyOTPDocument);
