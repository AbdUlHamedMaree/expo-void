import { gql } from '$gql';

export const joinTripDocument = gql(`
  mutation JoinTripMutation($joinTripId: Float!, $joinTripPayload: JoinTripIt!) {
    joinTrip(id: $joinTripId, payload: $joinTripPayload) {
      id
    }
  }
`);
