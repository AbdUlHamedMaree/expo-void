import { gql } from '$gql';

export const myTripsDocument = gql(`
  query MyTripsQuery(
    $filters: GetTripsFiltersIt
    $meta: TripsMetaRequest
  ) {
    myTrips(filters: $filters, meta: $meta) {
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
