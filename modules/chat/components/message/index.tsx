import { useMemo } from 'react';
import { ViewProps } from 'react-native';

import { TextMessage } from './text';

import { MessageModel } from '$modules/chat/models/message';

export type BaseMessageProps = {
  wrapperProps?: ViewProps;
};

export type MessageProps = MessageModel & BaseMessageProps;

export const Message: React.FC<MessageProps> = message => {
  const messageJsx = useMemo(() => {
    switch (message.type) {
      case 'text':
        return <TextMessage {...message} />;
      case 'image':
        return null;
    }
  }, [message]);

  return messageJsx;
};
