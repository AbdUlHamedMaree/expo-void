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
          city
          area
          street
        }

        dropoffAddress {
          city
          area
          street
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
