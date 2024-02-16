import { createTripDocument } from './mutations/create-trip';
import { joinTripDocument } from './mutations/join-trip';
import { mapTripsDocument } from './queries/map-trips';
import { singleTripDocument } from './queries/single-trip';
import { tripsDocument } from './queries/trips';

import { createGraphQLCRUDEntity } from '$libs/graphql-react-query/create-graphql-crud-entity';

export const {
  queries: [useTripsQuery, useMapTripsQuery, useSingleTripQuery],
  mutations: [useJoinTripMutation, useCreateTripMutation],
} = createGraphQLCRUDEntity(
  tripsDocument,
  mapTripsDocument,
  singleTripDocument
)(joinTripDocument, createTripDocument);
