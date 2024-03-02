import { gql } from '$gql';

export const singleTripDocument = gql(`
  query SingleTripQuery($singleTripId: Float!) {
    trip(id: $singleTripId) {
      id
      capacity
      occupiedSeats
      plannedAt

      driverId
      passengers {
        id
      }

      pickupAddress {
        addressLineOne
      }
      pickupLatitude
      pickupLongitude

      dropoffAddress {
        addressLineOne
      }
      dropoffLatitude
      dropoffLongitude
    }
  }
`);
