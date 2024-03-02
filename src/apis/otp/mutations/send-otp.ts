import { gql } from '$gql';

export const sendOTPDocument = gql(`
  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {
    sendOtp(payload: $sendOTPPayload) {
      message
    }
  }
`);
