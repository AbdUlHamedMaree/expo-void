import { useCallback } from 'react';

import { useMeQuery } from '$apis/user';
import { gql } from '$gql';
import type { FragmentModel } from '$types/fragment-model';

const fragment = gql(/* GraphQL */ `
  fragment useCheckIsUserInTrip on TripOt {
    driverId
    passengers {
      id
    }
  }
`);

export type UseCheckIsUserInTripTripModel = FragmentModel<typeof fragment>;

export const useCheckIsUserInTrip = () => {
  const meQuery = useMeQuery();
  const user = meQuery.data?.me;

  return useCallback(
    (trip?: UseCheckIsUserInTripTripModel) => {
      if (!user || !trip) return false;

      if (trip?.driverId === user.id) return true;

      if (trip?.passengers?.some(passenger => passenger.id === user.id)) return true;

      return false;
    },
    [user]
  );
};
