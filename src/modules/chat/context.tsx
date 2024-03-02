import type { MessageModel } from './models/message';

import { createReactContext } from '$helpers/create-react-context';

export type ChatAppContextModel = {
  messages?: MessageModel[];

  onSend?: (text: string) => void;
};

export const [useChatAppContext, ChatAppProvider] =
  createReactContext<ChatAppContextModel>();
