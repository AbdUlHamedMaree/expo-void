import { gql } from '$gql';

export const createTripDocument = gql(`
  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {
    createTrip(payload: $createTripPayload) {
      id
    }
  }
`);
