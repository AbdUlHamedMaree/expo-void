import { router } from 'expo-router';
import { useAtom } from 'jotai/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-map-clustering';
import { Details, LatLng, PROVIDER_GOOGLE, Polyline, Region } from 'react-native-maps';
import type MapViewType from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMapTripsQuery } from '$apis/trips';
import { mapRegionAtom } from '$atoms/map-region';
import { getMapTrip, mapToMapTrip } from '$components/dumb/map-trip';
import { TripCard, mapToTripCard } from '$components/dumb/trip-card';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { dropoffToLatlng, pickupToLatlng } from '$helpers/pickup-dropoff-to-latlng';
import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { useCheckIsUserInTrip } from '$hooks/use-check-is-user-in-trip';
import {
  useGoogleMapsDirectionsQuery,
  useDirectionPolylinePoints,
} from '$libs/google-maps-direction/hook';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { IDUnion } from '$models/id';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  const theme = useAppTheme();
  const mapRef = useRef<MapViewType>(null);
  const insets = useSafeAreaInsets();

  const [focusedTripId, setFocusedTripId] = useState<IDUnion | undefined>();
  const [mapBoundaries, setMapBoundaries] = useState<{
    topLeft: LatLng;
    topRight: LatLng;
    bottomLeft: LatLng;
    bottomRight: LatLng;
  }>();

  const tripsQuery = useMapTripsQuery({
    variables: {
      tripsQueryFilters: {
        boundaries: mapBoundaries,
      },
    },
  });

  useRefreshOnFocus(tripsQuery.refetch);

  const trips = (tripsQuery.data ?? tripsQuery.previousData)?.trips.items;

  type SingleTrip = Exclude<typeof trips, undefined>[number];

  const [mapRegion, setMapRegion] = useAtom(mapRegionAtom);
  const colorSchema = useAppColorSchema();

  const checkIsUserInTrip = useCheckIsUserInTrip();

  const onMarkerClick = useCallback((trip: SingleTrip) => {
    setFocusedTripId(trip.id);
  }, []);

  const calculateAndSetBoundaries = useCallback(async () => {
    const mapBoundaries = await mapRef.current?.getMapBoundaries();

    if (!mapBoundaries) return;

    setMapBoundaries({
      topLeft: {
        latitude: mapBoundaries.northEast.latitude,
        longitude: mapBoundaries.southWest.longitude,
      },
      topRight: mapBoundaries.northEast,
      bottomLeft: mapBoundaries.southWest,
      bottomRight: {
        latitude: mapBoundaries.southWest.latitude,
        longitude: mapBoundaries.northEast.longitude,
      },
    });
  }, []);

  const handleRegionChangeComplete = useCallback(
    async (region: Region, _details: Details) => {
      setMapRegion(region);
      calculateAndSetBoundaries();
    },
    [setMapRegion, calculateAndSetBoundaries]
  );

  const tripsMarkers = useMemo(
    () =>
      trips?.reduce(
        (acc, trip) => {
          const mapTrip = getMapTrip({
            ...mapToMapTrip(trip),
            onPickupMarkerClick: () => onMarkerClick(trip),
            onDropoffMarkerClick: () => onMarkerClick(trip),
          });

          acc.pickup.push(mapTrip.pickup);
          acc.dropoff.push(mapTrip.dropoff);

          return acc;
        },
        { pickup: [] as React.ReactNode[], dropoff: [] as React.ReactNode[] }
      ),
    [onMarkerClick, trips]
  );

  const focusedTrip = useMemo(
    () => trips?.find(trip => trip.id === focusedTripId),
    [focusedTripId, trips]
  );

  const focusedTripDirectionsQuery = useGoogleMapsDirectionsQuery(
    useMemo(
      () =>
        focusedTrip
          ? {
              origin: pickupToLatlng(focusedTrip),
              destination: dropoffToLatlng(focusedTrip),
            }
          : undefined,
      [focusedTrip]
    ),
    { enabled: !!focusedTrip }
  );

  const focusedTripDirectionsPoints = useDirectionPolylinePoints({
    response: focusedTripDirectionsQuery.data?.data,
  });

  useEffect(() => {
    if (focusedTripDirectionsPoints.length > 0)
      mapRef.current?.fitToCoordinates(focusedTripDirectionsPoints, {
        edgePadding: {
          left: 10,
          top: 300,
          right: 10,
          bottom: 10,
        },
      });
  }, [focusedTripDirectionsPoints]);

  return (
    <ScreenWrapper disablePadding>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={commonStyles.flexFull}
        initialRegion={mapRegion}
        userInterfaceStyle={colorSchema}
        onRegionChangeComplete={handleRegionChangeComplete}
        rotateEnabled={false}
      >
        {tripsMarkers?.pickup}
        {tripsMarkers?.dropoff}
        {focusedTrip && (
          <Polyline
            coordinates={focusedTripDirectionsPoints}
            strokeWidth={4}
            strokeColor={theme.colors.primaryContainer}
          />
        )}
      </MapView>
      {focusedTrip && (
        <TripCard
          style={{ position: 'absolute', top: 16 + insets.top, left: 16, right: 16 }}
          {...mapToTripCard(focusedTrip)}
          onJoin={() =>
            checkIsUserInTrip(focusedTrip)
              ? undefined
              : router.push({
                  pathname: '/(trips)/single-trip/[trip-id]/join-trip',
                  params: { 'trip-id': focusedTrip.id },
                })
          }
          onShowMap={() =>
            router.push({
              pathname: '/(trips)/single-trip/[trip-id]',
              params: { 'trip-id': focusedTrip.id },
            })
          }
          onClose={() => setFocusedTripId(undefined)}
        />
      )}
    </ScreenWrapper>
  );
};
