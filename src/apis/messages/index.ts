import { createChatDocument } from './mutations/create-chat';
import { sendMessageDocument } from './mutations/send-message';

import { createApolloCRUDEntity } from '$libs/apollo-client-react-crud/create-apollo-crud-entity';

export const {
  queries: _,
  mutations: [useCreateChatMutation, useSendMessageMutation],
} = createApolloCRUDEntity()(createChatDocument, sendMessageDocument);
