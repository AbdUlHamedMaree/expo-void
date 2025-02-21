import { useLocalSearchParams } from 'expo-router';

import { useSingleTripQuery } from '$apis/trips';
import { LoadingSection } from '$components/dumb/loading-section';
import { ChatSingleTripsMainScreen } from '$screens/main/trips/single/chat';

export default function Screen() {
  const { 'trip-id': tripId } = useLocalSearchParams();

  const tripQuery = useSingleTripQuery({ variables: { singleTripId: +tripId } });

  if (tripQuery.loading) return <LoadingSection loading />;

  if (tripQuery.error) return <LoadingSection error />;

  return <ChatSingleTripsMainScreen trip={tripQuery.data?.trip!} />;
}
