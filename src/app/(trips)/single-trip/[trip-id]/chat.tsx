import { useLocalSearchParams } from 'expo-router';

import { ChatSingleTripsMainScreen } from '$screens/main/trips/single/chat';

export default function Screen() {
  const { 'trip-id': tripId } = useLocalSearchParams();

  return <ChatSingleTripsMainScreen tripId={+(tripId as string)} />;
}
