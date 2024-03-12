import { gql } from '$gql';

export const createChatDocument = gql(`
  mutation CreateChat($createChatTripId: Int!) {
    createChat(tripId: $createChatTripId) {
      id
    }
  }
`);
