import { createTripDocument } from './mutations/create-trip';
import { joinTripDocument } from './mutations/join-trip';
import { mapTripsDocument } from './queries/map-trips';
import { myTripsDocument } from './queries/my-trips';
import { singleTripDocument } from './queries/single-trip';
import { tripsDocument } from './queries/trips';

import { createApolloCRUDEntity } from '$libs/apollo-client-react-crud/create-apollo-crud-entity';

export const {
  queries: [useTripsQuery, useMapTripsQuery, useSingleTripQuery, useMyTripsQuery],
  mutations: [useJoinTripMutation, useCreateTripMutation],
} = createApolloCRUDEntity(
  tripsDocument,
  mapTripsDocument,
  singleTripDocument,
  myTripsDocument
)(joinTripDocument, createTripDocument);
