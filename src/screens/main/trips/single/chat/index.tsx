import { useSubscription } from '@apollo/client';
import { useRef, useState } from 'react';

import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { gql } from '$gql';
import { useHideRootTabs } from '$hooks/use-hide-root-tabs';
import { ChatApp } from '$modules/chat';
import { MessageModel } from '$modules/chat/models/message';

const MessageDocument = gql(`
  subscription Message {
    messageReceivedOnAChat {
      chatId
      tripId
      fromUser {
        id
        name
      }
      message
      createdAt
    }
  }
`);

export type ChatSingleTripsMainScreenProps = {
  //
};

export const ChatSingleTripsMainScreen: React.FC<ChatSingleTripsMainScreenProps> = () => {
  useHideRootTabs();

  useSubscription(MessageDocument, {
    onData: console.log,
    onError: console.error,
    onComplete: console.warn,
  });

  const idRef = useRef(1);
  const sendedRef = useRef(false);

  const [messages, setMessages] = useState<MessageModel[]>([
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
  ]);

  return (
    <ScreenWrapper disablePadding>
      <ChatApp
        messages={messages}
        onSend={text => {
          setMessages(v => [
            ...v,
            {
              id: idRef.current++,
              type: 'text',
              content: text,
              sended: (sendedRef.current = Math.random() > 0.5),
              sender: 'Ahmad',
              senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
            },
          ]);
        }}
      />
    </ScreenWrapper>
  );
};
