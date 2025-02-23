import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { coerce, object } from 'zod';

import { useJoinTripMutation, useSingleTripQuery } from '$apis/trips';
import { useMeQuery } from '$apis/user';
import { LoadingSection } from '$components/dumb/loading-section';
import { CheckboxItemField } from '$components/fields/checkbox-item';
import { TextField } from '$components/fields/text';
import { MaterialCommunityIcon } from '$components/icons';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { stackScreenWithBetterBackButton } from '$hocs/stack-screen-with-better-back-button';
import { toast } from '$modules/react-native-paper-toast';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';

export type JoinTripFormFields = {
  count: number;
  isDriver: boolean;
};
type PageProps = {
  //
};

const Page: React.FC<PageProps> = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const meQuery = useMeQuery();

  const me = meQuery.data?.me;

  const { 'trip-id': tripId } = useLocalSearchParams();

  const singleTripQuery = useSingleTripQuery({
    variables: { singleTripId: +(tripId as string) },
  });

  const trip = singleTripQuery.data?.trip;

  const [joinTrip, joinTripResult] = useJoinTripMutation();

  const formattedTime = useMemo(
    () => (trip?.plannedAt ? format(new Date(trip.plannedAt), 'PPPP') : 'Unknown Time'),
    [trip?.plannedAt]
  );

  const emptySeatsCount = (trip?.capacity ?? 1) - (trip?.occupiedSeats ?? 1);

  const validationSchema = useMemo(() => {
    return object({
      count: coerce.number().max(emptySeatsCount ?? 7),
      isDriver: coerce.boolean(),
    }).refine(data => (data.isDriver ? data.count >= 0 : data.count > 0), {
      message: "Count should be more that 0 (unless you're the driver)",
      path: ['count'],
    });
  }, [emptySeatsCount]);

  const methods = useForm<JoinTripFormFields>({
    defaultValues: {
      count: 0,
      isDriver: false,
    },
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit = useMemo(
    () =>
      methods.handleSubmit(async values => {
        if (!trip) return;

        try {
          await joinTrip({
            variables: {
              joinTripId: trip.id,
              joinTripPayload: {
                requestedSeatsCount: values.count,
                poolerType: values.isDriver ? 'driver' : 'passenger',
              },
            },
          });

          router.push({
            pathname: '/(trips)/single-trip/[trip-id]/',
            params: {
              'trip-id': trip.id,
            },
          });

          toast.success('Trip joined successfully!');
        } catch (err) {
          console.error(err);

          if (err instanceof Error) toast.error(err.message);
        }
      }),
    [joinTrip, methods, router, trip]
  );

  if (singleTripQuery.loading || meQuery.loading) return <LoadingSection loading />;

  if (!trip) return null;

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}>
        <MaterialCommunityIcon name='car' size={24} color={theme.colors.primary} />
        <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
          {trip.formattedPickupAddress ?? 'Unknown Pickup point'}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}>
        <MaterialCommunityIcon
          name='flag-checkered'
          size={24}
          color={theme.colors.primary}
        />
        <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
          {trip.formattedDropoffAddress ?? 'Unknown Dropoff point'}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}>
        <MaterialCommunityIcon
          name='clock-time-four-outline'
          size={24}
          color={theme.colors.primary}
        />
        <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
          {formattedTime}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}>
        <MaterialCommunityIcon name='car-seat' size={24} color={theme.colors.primary} />
        <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
          {emptySeatsCount} Seats left
        </Text>
      </View>

      <View style={{ flex: 1 }} />
      <Divider style={{ marginBottom: spacing.lg }} />
      <Text variant='bodyLarge'>Please fill the following to be able to join</Text>
      <FormProvider {...methods}>
        <TextField
          name='count'
          label='Seats Count'
          mode='outlined'
          style={{ marginTop: spacing.lg }}
        />
        {me?.role === 'driver' && (
          <>
            <View style={{ marginVertical: spacing.sm }} />
            <CheckboxItemField
              name='isDriver'
              label='Joining as driver?'
              disabled={!!trip.driverId}
            />
          </>
        )}
        <View style={{ marginVertical: spacing.md }} />
      </FormProvider>

      <Button
        loading={joinTripResult.loading}
        disabled={joinTripResult.loading}
        mode='contained'
        onPress={handleSubmit}
      >
        Join
      </Button>
    </ScreenWrapper>
  );
};

export default stackScreenWithBetterBackButton(Page);
