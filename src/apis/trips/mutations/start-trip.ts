import { gql } from '$gql';

export const startTripDocument = gql(/* GraphQL */ `
  mutation StartTrip($startTripId: Float!) {
    startTrip(id: $startTripId) {
      id
    }
  }
`);
