import { sendOTPDocument } from './mutations/send-otp';
import { verifyOTPDocument } from './mutations/verify-otp';

import { createApolloCRUDEntity } from '$libs/apollo-client-react-crud/create-apollo-crud-entity';

export const {
  queries: _,
  mutations: [useSendOtpMutation, useVerifyOTPMutation],
} = createApolloCRUDEntity()(sendOTPDocument, verifyOTPDocument);
