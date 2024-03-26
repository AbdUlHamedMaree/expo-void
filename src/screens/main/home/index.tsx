import { router } from 'expo-router';
import { useAtom } from 'jotai/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import MapView, { Details, LatLng, PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { useMapTripsQuery } from '$apis/trips';
import { mapRegionAtom } from '$atoms/map-region';
import { MapTrip } from '$components/dumb/map-trip';
import { Trip } from '$components/dumb/trip';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { toTripRoute } from '$fragments/trip-route';
import { dropoffToLatlng, pickupToLatlng } from '$helpers/pickup-dropoff-to-latlng';
import { useAppColorSchema } from '$hooks/use-app-color-schema';
import { useShowRootTabs } from '$hooks/use-show-root-tabs';
import {
  useGoogleMapsDirectionsQuery,
  useDirectionPolyline,
} from '$libs/google-maps-direction/hook';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { IDUnion } from '$models/id';
import { commonStyles } from '$styles/common';

export type MainHomeScreenProps = {
  //
};

export const MainHomeScreen: React.FC<MainHomeScreenProps> = () => {
  useShowRootTabs();

  const mapRef = useRef<MapView>(null);

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

  const onMarkerClick = useCallback((trip: SingleTrip) => {
    setFocusedTripId(trip.id);

    mapRef.current?.fitToCoordinates([pickupToLatlng(trip), dropoffToLatlng(trip)]);
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
      trips?.map(trip => (
        <MapTrip
          key={trip.id}
          {...toTripRoute(trip)}
          onPickupMarkerClick={() => onMarkerClick(trip)}
          onDropoffMarkerClick={() => onMarkerClick(trip)}
        />
      )),
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

  const focusedTripMapViewDirections = useDirectionPolyline({
    response: focusedTripDirectionsQuery.data?.data,
  });

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
        {tripsMarkers}
        {focusedTrip && focusedTripMapViewDirections}
      </MapView>
      {focusedTrip && (
        <Trip
          style={{ position: 'absolute', top: 16, left: 16, right: 16 }}
          {...focusedTrip}
          onJoin={() => {}}
          onShowMore={() =>
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
