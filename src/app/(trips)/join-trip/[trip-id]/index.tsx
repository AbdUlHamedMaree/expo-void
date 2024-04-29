import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { useSingleTripQuery } from '$apis/trips';
import { Trip } from '$components/dumb/trip';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { spacing } from '$theme/spacing';

type PageProps = {
  //
};

const Page: React.FC<PageProps> = () => {
  const { 'trip-id': tripId } = useLocalSearchParams();

  const singleTripQuery = useSingleTripQuery({
    variables: { singleTripId: +(tripId as string) },
  });

  const trip = singleTripQuery.data?.trip;

  return (
    <ScreenWrapper>
      <Card>
        <Card.Title title={<Text variant='titleLarge'>Note:</Text>} />
        <Card.Content>
          <Text variant='bodyLarge'>
            This app is in early access phase, where all customers has free trail to all
            features, but this will change in the future
          </Text>
        </Card.Content>
      </Card>
      <Trip {...trip} style={{ marginTop: spacing.lg }} />
      <View style={{ flex: 1 }} />
      <Button mode='contained'>Join</Button>
    </ScreenWrapper>
  );
};

export default Page;
