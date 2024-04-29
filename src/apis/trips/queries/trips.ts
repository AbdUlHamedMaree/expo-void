import { gql } from '$gql';

export const tripsDocument = gql(`
  query TripsQuery(
    $tripsQueryFilters: GetTripsFiltersIt
    $tripsQueryMeta: TripsMetaRequest
  ) {
    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {
      items {
        id
        capacity
        occupiedSeats
        plannedAt
        passengers {
          id
        }

        pickupAddress {
          addressLineOne
          area
          city
        }

        dropoffAddress {
          addressLineOne
          area
          city
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
