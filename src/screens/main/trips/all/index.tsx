import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo } from 'react';
import { View, VirtualizedList } from 'react-native';
import { FAB } from 'react-native-paper';

import { useTripsQuery } from '$apis/trips';
import { tripsFiltersAtom } from '$atoms/trips-filters';
import { LoadingSection } from '$components/dumb/loading-section';
import { TripCard, mapToTripCard } from '$components/dumb/trip-card';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { GetTripsFiltersIt, InputMaybe } from '$gql/graphql';
import { useCheckIsUserInTrip } from '$hooks/use-check-is-user-in-trip';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { spacing } from '$theme/spacing';

export type AllTripsScreenProps = {
  //
};

export const AllTripsScreen: React.FC<AllTripsScreenProps> = () => {
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  const tripsQueryFilters = useMemo<InputMaybe<GetTripsFiltersIt>>(
    () => ({
      pickupCountries: tripsFilters?.pickup?.country
        ? [tripsFilters?.pickup?.country]
        : undefined,
      pickupCities: tripsFilters?.pickup?.city ? [tripsFilters?.pickup?.city] : undefined,
      pickupAreas: tripsFilters?.pickup?.area ? [tripsFilters?.pickup?.area] : undefined,
      dropoffCountries: tripsFilters?.dropoff?.country
        ? [tripsFilters?.dropoff?.country]
        : undefined,
      dropoffCities: tripsFilters?.dropoff?.city
        ? [tripsFilters?.dropoff?.city]
        : undefined,
      dropoffAreas: tripsFilters?.dropoff?.area
        ? [tripsFilters?.dropoff?.area]
        : undefined,

      availableSeats: tripsFilters?.minAvailableSeats,
      plannedAtFrom: tripsFilters?.fromAt?.toISOString(),
      plannedAtTo: tripsFilters?.toAt?.toISOString(),
    }),
    [
      tripsFilters?.dropoff?.area,
      tripsFilters?.dropoff?.city,
      tripsFilters?.dropoff?.country,
      tripsFilters?.fromAt,
      tripsFilters?.minAvailableSeats,
      tripsFilters?.pickup?.area,
      tripsFilters?.pickup?.city,
      tripsFilters?.pickup?.country,
      tripsFilters?.toAt,
    ]
  );

  const tripsQuery = useTripsQuery({
    variables: { tripsQueryFilters },
  });
  useRefreshOnFocus(tripsQuery.refetch);

  const trips = tripsQuery.data?.trips.items;

  const checkIsUserInTrip = useCheckIsUserInTrip();

  const nonJoinedTrip = useMemo(
    () => trips?.filter(trip => !checkIsUserInTrip(trip)),
    [checkIsUserInTrip, trips]
  );

  const handleCardJoin = useCallback((id: number) => {
    router.push({
      pathname: `/(trips)/single-trip/[trip-id]/join-trip`,
      params: { 'trip-id': id },
    });
  }, []);

  const handleShowMore = useCallback((id: number) => {
    router.push({
      pathname: `/(trips)/single-trip/[trip-id]`,
      params: { 'trip-id': id },
    });
  }, []);

  return (
    <ScreenWrapper disablePadding>
      <LoadingSection
        loading={tripsQuery.loading}
        error={!!tripsQuery.error}
        empty={trips?.length === 0}
      >
        {nonJoinedTrip && (
          <VirtualizedList<(typeof nonJoinedTrip)[number] & { id: number }>
            keyExtractor={item => item.id + ''}
            getItemCount={nonJoinedTrip => nonJoinedTrip.length}
            getItem={(nonJoinedTrip, i) => nonJoinedTrip[i]}
            data={nonJoinedTrip}
            contentContainerStyle={{ padding: spacing.lg }}
            ItemSeparatorComponent={() => <View style={{ marginVertical: spacing.md }} />}
            renderItem={item => {
              const trip = item.item;

              return (
                <TripCard
                  key={trip.id}
                  {...mapToTripCard(trip)}
                  onJoin={
                    checkIsUserInTrip(trip) ? undefined : () => handleCardJoin(trip.id)
                  }
                  onShowMap={() => handleShowMore(trip.id)}
                />
              );
            }}
          />
        )}
      </LoadingSection>
      <FAB
        icon='plus'
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => router.push('/(trips)/create-new-trip')}
      />
    </ScreenWrapper>
  );
};
