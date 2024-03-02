import { MessagesScreen } from './components/screens/messages';
import { ChatAppProvider, type ChatAppContextModel } from './context';

export type ChatAppProps = ChatAppContextModel;

export const ChatApp: React.FC<ChatAppProps> = props => {
  return (
    <ChatAppProvider value={props}>
      <MessagesScreen />
    </ChatAppProvider>
  );
};
