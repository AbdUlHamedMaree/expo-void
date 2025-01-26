import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAtomValue } from 'jotai';
import { compact } from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Details, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button, FAB, IconButton, Text, type FABGroupProps } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  useEndTripMutation,
  useLeaveTripMutation,
  useSingleTripQuery,
  useStartTripMutation,
} from '$apis/trips';
import { useMeQuery } from '$apis/user';
import { mapRegionAtom } from '$atoms/map-region';
import { LoadingSection } from '$components/dumb/loading-section';
import { getMapTrip, mapToMapTrip } from '$components/dumb/map-trip';
import { PaperBottomSheet } from '$components/dumb/paper-bottom-sheet';
import { MaterialCommunityIcon } from '$components/icons';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import {
  dropoffToLatlng,
  pickupDropoffToLatlng,
  pickupToLatlng,
} from '$helpers/pickup-dropoff-to-latlng';
import { useToggleState } from '$hooks/use-toggle-state';
import { TripStatusEnum } from '$models/trip-status';
import { isDefined } from '$modules/checks';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';

const BOTTOM_SHEET_CLOSED_SIZE = 48;

export type SingleTripsScreenProps = {
  //
};

export const SingleTripsScreen: React.FC<SingleTripsScreenProps> = () => {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();
  const router = useRouter();
  const meQuery = useMeQuery();

  const { 'trip-id': tripId } = useLocalSearchParams();

  const singleTripQuery = useSingleTripQuery({
    variables: { singleTripId: +(tripId as string) },
  });

  const [leaveTrip, leaveTripResult] = useLeaveTripMutation({
    variables: {
      leaveTripId: +(tripId as string),
    },
  });

  const [startTrip, startTripResult] = useStartTripMutation({
    variables: {
      startTripId: +(tripId as string),
    },
  });

  const [endTrip, endTripResult] = useEndTripMutation({
    variables: {
      endTripId: +(tripId as string),
    },
  });

  const trip = singleTripQuery.data?.trip;
  const user = meQuery.data?.me;

  const isCurrentUserTripDriver = useMemo(
    () => isDefined(trip?.driverId) && isDefined(user?.id) && trip.driverId === user.id,
    [trip?.driverId, user?.id]
  );

  const isCurrentUserTripPassenger = useMemo(
    () =>
      isDefined(trip?.passengers) &&
      isDefined(user?.id) &&
      !!trip.passengers.find(passenger => passenger.id === user.id),
    [trip?.passengers, user?.id]
  );

  const isUserInTrip = useMemo(
    () => isCurrentUserTripDriver || isCurrentUserTripPassenger,
    [isCurrentUserTripDriver, isCurrentUserTripPassenger]
  );

  const [isMapFittedToTrip, setIsMapFittedToTrip] = useState(false);

  const fabState = useToggleState();

  const initialMapRegion = useAtomValue(mapRegionAtom);

  const mapRef = useRef<MapView>(null);

  const handleRegionChangeComplete = useCallback(
    (_region: Region, details: Details) =>
      details.isGesture && setIsMapFittedToTrip(false),
    []
  );

  const fitMapToTrip = useCallback(() => {
    if (!mapRef.current || !trip) return;

    const locations = pickupDropoffToLatlng(trip);

    mapRef.current.fitToCoordinates([locations.pickup, locations.dropoff]);

    setIsMapFittedToTrip(true);
  }, [trip]);

  const handleMapReady = useCallback(() => {
    fitMapToTrip();
  }, [fitMapToTrip]);

  const mapTrip = useMemo(() => trip && getMapTrip(mapToMapTrip(trip)), [trip]);

  // TODO: use the internal component
  const mapViewDirections = useMemo(
    () =>
      trip && (
        <MapViewDirections
          origin={pickupToLatlng(trip)}
          destination={dropoffToLatlng(trip)}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_SERVICES_API_KEY}
          strokeWidth={3}
          strokeColor='#000'
        />
      ),
    [trip]
  );

  const formattedTime = useMemo(
    () => (trip?.plannedAt ? format(new Date(trip.plannedAt), 'PPPP') : 'Unknown Time'),
    [trip?.plannedAt]
  );

  const fabActions = useMemo(
    () =>
      compact<FABGroupProps['actions'][number]>([
        isCurrentUserTripDriver &&
          trip?.status === TripStatusEnum.created && {
            icon: 'ray-start-arrow',
            label: 'Start',
            onPress: () => startTrip(),
          },
        isCurrentUserTripDriver &&
          trip?.status === TripStatusEnum.started && {
            icon: 'ray-end',
            label: 'End',
            onPress: () => endTrip(),
          },
        isUserInTrip && {
          icon: 'chat-outline',
          label: 'Chat',
          onPress: () =>
            router.push({
              pathname: `/(trips)/single-trip/[trip-id]/chat`,
              params: { 'trip-id': tripId },
            }),
        },
      ]),
    [
      endTrip,
      isCurrentUserTripDriver,
      isUserInTrip,
      router,
      startTrip,
      trip?.status,
      tripId,
    ]
  );

  if (singleTripQuery.loading || meQuery.loading) return <LoadingSection loading />;
  if (singleTripQuery.error || !trip) return <LoadingSection error />;

  const emptySeatsCount = (trip.capacity ?? 1) - (trip.occupiedSeats ?? 1);

  return (
    <ScreenWrapper disablePadding>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onMapReady={handleMapReady}
        initialRegion={initialMapRegion}
        style={commonStyles.flexFull}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {mapTrip?.pickup}
        {mapTrip?.dropoff}
        {mapViewDirections}
      </MapView>
      <IconButton
        icon='arrow-left'
        mode='contained'
        onPress={router.back}
        style={{ position: 'absolute', left: 8, top: 8 + insets.top }}
      />

      <IconButton
        icon={isMapFittedToTrip ? 'crosshairs-gps' : 'crosshairs'}
        mode='contained'
        onPress={fitMapToTrip}
        style={{ position: 'absolute', right: 8, top: 8 + insets.top }}
      />

      <FAB.Group
        visible={fabActions.length > 0}
        open={fabState.isOpen}
        icon={fabState.isOpen ? 'close' : 'plus'}
        actions={fabActions}
        onStateChange={({ open }) => fabState.set(open)}
        style={{
          bottom: BOTTOM_SHEET_CLOSED_SIZE,
        }}
      />
      <PaperBottomSheet index={0} snapPoints={[BOTTOM_SHEET_CLOSED_SIZE, '40%']}>
        <SafeAreaView style={[commonStyles.flexFull, commonStyles.screenPadding]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcon name='car' size={24} color={theme.colors.primary} />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
              {trip.formattedPickupAddress ?? 'Unknown Pickup point'}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}
          >
            <MaterialCommunityIcon
              name='flag-checkered'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
              {trip.formattedDropoffAddress ?? 'Unknown Dropoff point'}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}
          >
            <MaterialCommunityIcon
              name='clock-time-four-outline'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
              {formattedTime}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}
          >
            <MaterialCommunityIcon
              name='car-seat'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
              {emptySeatsCount} Seats left
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          {isUserInTrip ? (
            <Button
              mode='outlined'
              loading={leaveTripResult.loading}
              onPress={() => leaveTrip()}
            >
              Leave
            </Button>
          ) : (
            <Button
              mode='contained'
              disabled={isUserInTrip}
              onPress={() => {
                if (!user)
                  return router.push({
                    pathname: `/profile/login`,
                    params: {
                      'trip-id': tripId,
                      toast: JSON.stringify({
                        message: 'You need to be logged in to be able to join trips!',
                        type: 'warning',
                      }),
                    },
                  });

                router.push({
                  pathname: `/(trips)/single-trip/[trip-id]/join-trip`,
                  params: { 'trip-id': tripId },
                });
              }}
            >
              Join
            </Button>
          )}
        </SafeAreaView>
      </PaperBottomSheet>
    </ScreenWrapper>
  );
};
