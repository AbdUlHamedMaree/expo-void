import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo } from 'react';
import { VirtualizedList } from 'react-native';

import { useMyTripsQuery } from '$apis/trips';
import { tripsFiltersAtom } from '$atoms/trips-filters';
import { LoadingSection } from '$components/dumb/loading-section';
import { TripCard, mapToTripCard } from '$components/dumb/trip-card';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { GetTripsFiltersIt, InputMaybe } from '$gql/graphql';
import { useCheckIsUserInTrip } from '$hooks/use-check-is-user-in-trip';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { spacing } from '$theme/spacing';

export type MainProfileAccountMyTripsScreenProps = {
  //
};

export const MainProfileAccountMyTripsScreen: React.FC<
  MainProfileAccountMyTripsScreenProps
> = () => {
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

  const tripsQuery = useMyTripsQuery({
    variables: { filters: tripsQueryFilters },
  });
  useRefreshOnFocus(tripsQuery.refetch);

  const trips = tripsQuery.data?.myTrips.items;

  const checkIsUserInTrip = useCheckIsUserInTrip();

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
        {trips && (
          <VirtualizedList<(typeof trips)[number] & { id: number }>
            keyExtractor={item => item.id + ''}
            getItemCount={trips => trips.length}
            getItem={(trips, i) => trips[i]}
            data={trips}
            renderItem={item => {
              const trip = item.item;

              return (
                <TripCard
                  key={trip.id}
                  {...mapToTripCard(trip)}
                  style={{
                    marginHorizontal: spacing.lg,
                    marginTop: spacing.lg,
                  }}
                  onShowMap={() => handleShowMore(trip.id)}
                />
              );
            }}
          />
        )}
      </LoadingSection>
    </ScreenWrapper>
  );
};
