import { gql } from '$gql';

export const chatByTripIdDocument = gql(`
  query ChatByTripId($chatTripId: Int!) {
    chatByTripId(tripId: $chatTripId) {
      id
      messages {
        createdAt
        message
        user {
          id
          email
          name
        }
      }
    }
  }
`);
