import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo, useState } from 'react';
import { VirtualizedList } from 'react-native';

import { useMyTripsQuery } from '$apis/trips';
import { tripsFiltersAtom } from '$atoms/trips-filters';
import { LoadingSection } from '$components/dumb/loading-section';
import { Trip } from '$components/dumb/trip';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { GetTripsFiltersIt, InputMaybe } from '$gql/graphql';
import { useCheckIsUserInTrip } from '$hooks/use-check-is-user-in-trip';
import { useJoinTripModal } from '$hooks/use-join-trip-modal';
import { useRefreshOnFocus } from '$libs/react-query/use-refetch-on-screen-focus';
import { IDUnion } from '$models/id';
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

  const [selectedTripId, setSelectedTripId] = useState<IDUnion | null>(null);

  const selectedTrip = useMemo(
    () => trips?.find(trip => trip.id === selectedTripId),
    [selectedTripId, trips]
  );

  const checkIsUserInTrip = useCheckIsUserInTrip();

  const handleJoinTripModalCancel = useCallback(() => {
    setSelectedTripId(null);
  }, []);

  const handleJoinTripModalJoin = handleJoinTripModalCancel;

  const joinTripModal = useJoinTripModal({
    trip: selectedTrip,
    onCancel: handleJoinTripModalCancel,
    onJoin: handleJoinTripModalJoin,
  });

  const handleCardJoin = useCallback(
    (id: number) => {
      setSelectedTripId(id);
      joinTripModal.open();
    },
    [joinTripModal]
  );

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
              const { id, ...props } = item.item;

              return (
                <Trip
                  key={id}
                  {...props}
                  style={{
                    marginHorizontal: spacing.lg,
                    marginTop: spacing.lg,
                  }}
                  joined={checkIsUserInTrip(props)}
                  onJoin={() => handleCardJoin(id)}
                  onShowMap={() => handleShowMore(id)}
                />
              );
            }}
          />
        )}
      </LoadingSection>
      {joinTripModal.modal}
    </ScreenWrapper>
  );
};
