import { gql } from '$gql';

export const verifyOTPDocument = gql(`
  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {
    verifyOtp(payload: $verifyOTPPayload) {
      accessToken
      refreshToken
    }
  }
`);
