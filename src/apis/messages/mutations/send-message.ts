import { gql } from '$gql';

export const sendMessageDocument = gql(`
  mutation SendMessage($chatId: Int!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      id
    }
  }
`);
