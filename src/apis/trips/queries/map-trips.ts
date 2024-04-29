import { gql } from '$gql';

export const mapTripsDocument = gql(`
  query MapTripsQuery(
    $tripsQueryFilters: GetTripsFiltersIt
    $tripsQueryMeta: TripsMetaRequest
  ) {
    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        plannedAt

        pickupAddress {
          addressLineOne
          area
          city
        }
        pickupLatitude
        pickupLongitude

        dropoffAddress {
          addressLineOne
          area
          city
        }
        dropoffLatitude
        dropoffLongitude
      }
      meta {
        limit
        page
        totalCount
        totalPages
      }
    }
  }
`);
