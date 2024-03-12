import { format } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Details, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Button, FAB, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSingleTripQuery } from '$apis/trips';
import { mapRegionAtom } from '$atoms/map-region';
import { LoadingSection } from '$components/dumb/loading-section';
import { MapTrip } from '$components/dumb/map-trip';
import { PaperBottomSheet } from '$components/dumb/paper-bottom-sheet';
import { MaterialCommunityIcon } from '$components/icons';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { toTripRoute } from '$fragments/trip-route';
import {
  dropoffToLatlng,
  pickupDropoffToLatlng,
  pickupToLatlng,
} from '$helpers/pickup-dropoff-to-latlng';
import { useHideRootTabs } from '$hooks/use-hide-root-tabs';
import { useIsUserPartOfTheTrip } from '$hooks/use-is-user-in-trip';
import { useJoinTripModal } from '$hooks/use-join-trip-modal';
import { useToggleState } from '$hooks/use-toggle-state';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';

const BOTTOM_SHEET_CLOSED_SIZE = 48;

export type SingleTripsScreenProps = {
  //
};

export const SingleTripsScreen: React.FC<SingleTripsScreenProps> = () => {
  useHideRootTabs();

  const theme = useAppTheme();

  const { 'trip-id': id } = useLocalSearchParams();

  const singleTripQuery = useSingleTripQuery({
    variables: { singleTripId: +id },
  });
  const trip = singleTripQuery.data?.trip;

  const [isMapFittedToTrip, setIsMapFittedToTrip] = useState(false);

  const fabState = useToggleState();

  const initialMapRegion = useAtomValue(mapRegionAtom);

  const mapRef = useRef<MapView>(null);

  const isUserInTrip = useIsUserPartOfTheTrip(trip);

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

  const mapTrip = useMemo(
    () => trip && <MapTrip key={trip.id} {...toTripRoute(trip)} />,
    [trip]
  );

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

  const tripModal = useJoinTripModal({ trip });

  if (singleTripQuery.loading) return <LoadingSection loading />;
  if (singleTripQuery.error || !trip) return <LoadingSection error />;

  const emptySeatsCount = (trip.capacity ?? 1) - (trip.occupiedSeats ?? 1);

  return (
    <ScreenWrapper disablePadding>
      <MapView
        ref={mapRef}
        onMapReady={handleMapReady}
        initialRegion={initialMapRegion}
        style={commonStyles.flexFull}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {mapTrip}
        {mapViewDirections}
      </MapView>
      <IconButton
        icon='arrow-left'
        mode='contained'
        onPress={router.back}
        style={{ position: 'absolute', left: 8, top: 8 }}
      />

      <IconButton
        icon={isMapFittedToTrip ? 'crosshairs-gps' : 'crosshairs'}
        mode='contained'
        onPress={fitMapToTrip}
        style={{ position: 'absolute', right: 8, top: 8 }}
      />

      <FAB.Group
        visible
        open={fabState.isOpen}
        icon={fabState.isOpen ? 'close' : 'plus'}
        actions={[
          {
            icon: 'chat-outline',
            label: 'Chat',
            onPress: () =>
              router.push({
                pathname: `/(trips)/single-trip/[trip-id]/chat`,
                params: { 'trip-id': id },
              }),
          },
          {
            icon: 'logout',
            label: 'Leave Trip',
            onPress: () => console.log('Logout Pressed'),
          },
        ]}
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
              {trip.pickupAddress.addressLineOne ?? 'Unknown Destination'}
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
              {trip.dropoffAddress.addressLineOne ?? 'Unknown Destination'}
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
          <Button
            mode='contained'
            disabled={isUserInTrip}
            onPress={() => tripModal.open()}
          >
            {isUserInTrip ? 'Joined' : 'Join'}
          </Button>
        </SafeAreaView>
      </PaperBottomSheet>
      {tripModal.modal}
    </ScreenWrapper>
  );
};
