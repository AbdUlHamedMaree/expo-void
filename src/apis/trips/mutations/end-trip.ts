import { gql } from '$gql';

export const endTripDocument = gql(/* GraphQL */ `
  mutation EndTrip($endTripId: Float!) {
    endTrip(id: $endTripId) {
      id
    }
  }
`);
