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
          city
          area
          street
        }
        formattedPickupAddress
        pickupLatitude
        pickupLongitude

        dropoffAddress {
          city
          area
          street
        }
        formattedDropoffAddress
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
