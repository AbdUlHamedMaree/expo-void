import { createTripDocument } from './mutations/create-trip';
import { joinTripDocument } from './mutations/join-trip';
import { mapTripsDocument } from './queries/map-trips';
import { singleTripDocument } from './queries/single-trip';
import { tripsDocument } from './queries/trips';

import { createApolloCRUDEntity } from '$libs/apollo-client-react-crud/create-apollo-crud-entity';

export const {
  queries: [useTripsQuery, useMapTripsQuery, useSingleTripQuery],
  mutations: [useJoinTripMutation, useCreateTripMutation],
} = createApolloCRUDEntity(
  tripsDocument,
  mapTripsDocument,
  singleTripDocument
)(joinTripDocument, createTripDocument);
