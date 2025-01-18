import { gql } from '$gql';

export const tripsDocument = gql(/* GraphQL */ `
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
        googleDirectionsApiData {
          routes {
            overview_polyline {
              points
            }
            legs {
              steps {
                distance {
                  text
                  value
                }
                duration {
                  text
                  value
                }
                start_location {
                  lat
                  lng
                }
                end_location {
                  lat
                  lng
                }
                polyline {
                  points
                }
                steps
                transit_details {
                  departure_time {
                    text
                    time_zone
                    value
                  }
                  departure_stop {
                    location {
                      lat
                      lng
                    }
                    name
                  }
                  arrival_time {
                    text
                    time_zone
                    value
                  }
                  arrival_stop {
                    location {
                      lat
                      lng
                    }
                    name
                  }
                }
              }
            }
            fare {
              currency
              text
              value
            }
            bounds {
              northeast {
                lat
                lng
              }
              southwest {
                lat
                lng
              }
            }
          }
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
