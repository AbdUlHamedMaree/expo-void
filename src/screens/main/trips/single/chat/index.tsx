import { useQuery, useSubscription } from '@apollo/client';
import { useMemo, useRef, useState } from 'react';

import { useSendMessageMutation } from '$apis/messages';
import { chatByTripIdDocument } from '$apis/messages/queries/trips';
import { useMeQuery } from '$apis/user';
import { LoadingSection } from '$components/dumb/loading-section';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { gql } from '$gql';
import type { TripOt } from '$gql/graphql';
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
  trip: Pick<TripOt, 'id' | 'driverId'>;
};

export const ChatSingleTripsMainScreen: React.FC<ChatSingleTripsMainScreenProps> = ({
  trip,
}) => {
  const idRef = useRef(1);

  const [subscriptionMessages, setSubscriptionMessages] = useState<MessageModel[]>([]);

  const meQuery = useMeQuery();

  useSubscription(MessageDocument, {
    onData: ({ data: { data, error } }) => {
      const newMessage = data?.messageReceivedOnAChat;
      if (!newMessage) {
        console.warn('message listener fired with no message');
        if (error) console.error(error);
        return;
      }

      setSubscriptionMessages(messages => [
        ...messages,
        {
          id: idRef.current++,
          type: 'text',
          content: newMessage.message,
          sender: newMessage.fromUser.name,
          senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
          sended: meQuery.data?.me.id === newMessage.fromUser.id,
          isDriver: newMessage.fromUser.id === trip.driverId,
        },
      ]);
    },
    onError: console.error,
    onComplete: console.warn,
  });

  const [sendMessage, sendMessageResult] = useSendMessageMutation();

  const chatQueryResult = useQuery(chatByTripIdDocument, {
    variables: { chatTripId: trip.id },
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
        isDriver: message.user.id === trip.driverId,
      })) ?? [],
    [chatQueryResult.data?.chatByTripId?.messages, meQuery.data?.me.id, trip.driverId]
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
        onSend={text =>
          sendMessage({
            variables: { message: text, chatId: chatQueryResult.data!.chatByTripId!.id },
          })
        }
      />
    </ScreenWrapper>
  );
};
