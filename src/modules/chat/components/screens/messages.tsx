import { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Message } from '../message';
import { MessageBar } from '../message-bar';

import { useHideRootTabs } from '$hooks/use-hide-root-tabs';
import { useChatAppContext } from '$modules/chat/context';
import { MessageModel } from '$modules/chat/models/message';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';

export type MessagesScreenProps = object;

export const MessagesScreen: React.FC<MessagesScreenProps> = () => {
  useHideRootTabs();
  const scrollViewRef = useRef<FlatList<MessageModel>>(null);
  const { messages } = useChatAppContext();

  const revertedMessages = useMemo(() => [...(messages ?? [])].reverse(), [messages]);

  return (
    <SafeAreaView style={[commonStyles.flexFull]}>
      <FlatList
        ref={scrollViewRef}
        data={revertedMessages}
        renderItem={({ item }) => (
          <Message
            key={item.id}
            {...item}
            wrapperProps={{
              style: styles.message,
            }}
          />
        )}
        keyExtractor={item => item.id + ''}
        inverted
        contentContainerStyle={styles.messagesContentContainer}
        style={[commonStyles.screenHorizontalPadding]}
      />
      <MessageBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  message: {
    marginVertical: spacing.sm,
  },
  messagesContentContainer: {
    paddingVertical: spacing.md,
  },
});
