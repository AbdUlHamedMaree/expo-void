import { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Message } from '../message';
import { MessageBar } from '../message-bar';

import { useHideRootTabs } from '$hooks/use-hide-root-tabs';
import { MessageModel } from '$modules/chat/models/message';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';

export type MessagesScreenProps = {
  messageBoxText?: string;
  messages?: MessageModel[];

  onSend?: () => void;
  onMessageBoxChangeText?: (text: string) => void;
};

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  messageBoxText,
  messages,
  onSend,
  onMessageBoxChangeText,
}) => {
  useHideRootTabs();
  const scrollViewRef = useRef<FlatList<MessageModel>>(null);

  const revertedMessages = useMemo(() => messages, [messages]);

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
        // onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        inverted
        contentContainerStyle={styles.messagesContentContainer}
        style={[commonStyles.screenHorizontalPadding]}
      />
      <MessageBar
        messageBoxText={messageBoxText}
        onSend={onSend}
        onMessageBoxChangeText={onMessageBoxChangeText}
      />
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
