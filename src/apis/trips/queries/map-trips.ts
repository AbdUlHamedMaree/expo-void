import { gql } from '$gql';

export const mapTripsDocument = gql(/* GraphQL */ `
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
        driverId

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

        passengers {
          id
        }
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
