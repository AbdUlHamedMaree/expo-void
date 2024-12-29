import { gql } from '$gql';

export const leaveTripDocument = gql(/* GraphQL */ `
  mutation leaveTripMutation($leaveTripId: Float!) {
    leaveTrip(id: $leaveTripId) {
      id
    }
  }
`);
