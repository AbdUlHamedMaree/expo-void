import { useQuery, useSubscription } from '@apollo/client';
import { useMemo, useRef, useState } from 'react';

import { useSendMessageMutation } from '$apis/messages';
import { chatByTripIdDocument } from '$apis/messages/queries/trips';
import { useMeQuery } from '$apis/user';
import { LoadingSection } from '$components/dumb/loading-section';
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
  tripId: number;
};

export const ChatSingleTripsMainScreen: React.FC<ChatSingleTripsMainScreenProps> = ({
  tripId,
}) => {
  useHideRootTabs();

  const idRef = useRef(1);

  const [subscriptionMessages, setSubscriptionMessages] = useState<MessageModel[]>([]);

  const meQuery = useMeQuery();

  useSubscription(MessageDocument, {
    onData: data => {
      if (!data.data.data?.messageReceivedOnAChat) return;

      const newMessage = data.data.data.messageReceivedOnAChat;

      setSubscriptionMessages(messages => [
        ...messages,
        {
          id: idRef.current++,
          type: 'text',
          content: newMessage.message,
          sender: newMessage.fromUser.name,
          senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
          sended: meQuery.data?.me.id === newMessage.fromUser.id,
        },
      ]);
    },
    onError: console.error,
    onComplete: console.warn,
  });

  const [sendMessage, sendMessageResult] = useSendMessageMutation();

  const chatQueryResult = useQuery(chatByTripIdDocument, {
    variables: { chatTripId: tripId },
    fetchPolicy: 'no-cache',
  });

  const apiMessages = useMemo<MessageModel[]>(
    () =>
      chatQueryResult.data?.chatByTripId?.messages?.map(message => ({
        id: idRef.current++,
        type: 'text',
        content: message.message,
        sender: message.user.name,
        senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
        sended: meQuery.data?.me.id === message.user.id,
      })) ?? [],
    [chatQueryResult.data?.chatByTripId?.messages, meQuery.data?.me.id]
  );

  const allMessages = useMemo(
    () => [...apiMessages, ...subscriptionMessages],
    [apiMessages, subscriptionMessages]
  );

  if (chatQueryResult.loading || meQuery.loading) return <LoadingSection loading />;

  return (
    <ScreenWrapper disablePadding>
      <ChatApp
        messages={allMessages}
        onSend={async text => {
          await sendMessage({
            variables: { message: text, chatId: chatQueryResult.data!.chatByTripId!.id },
          });
        }}
      />
    </ScreenWrapper>
  );
};
