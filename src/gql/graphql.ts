/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BoundingBoxIt = {
  northEast?: InputMaybe<LatLngIt>;
  southWest?: InputMaybe<LatLngIt>;
};

export type CreateAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type CreateTripIt = {
  capacity: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  dropoffAddress: TripAddressIt;
  dropoffLatitude: Scalars['Float']['input'];
  dropoffLongitude: Scalars['Float']['input'];
  googleDirectionsApiData?: InputMaybe<GetGoogleMapsDirectionsResponseBodyIt>;
  pickupAddress: TripAddressIt;
  pickupLatitude: Scalars['Float']['input'];
  pickupLongitude: Scalars['Float']['input'];
  plannedAt: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
};

export type DirectionsGeocodedWaypointIt = {
  geocoder_status?: InputMaybe<Scalars['String']['input']>;
  partial_match?: InputMaybe<Scalars['String']['input']>;
  place_id?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DirectionsLegIt = {
  arrival_time?: InputMaybe<TimeZoneTextValueObjectIt>;
  departure_time?: InputMaybe<TimeZoneTextValueObjectIt>;
  distance?: InputMaybe<TextValueObjectIt>;
  duration?: InputMaybe<TextValueObjectIt>;
  duration_in_traffic: TextValueObjectIt;
  end_address: Scalars['String']['input'];
  end_location: LatLngIt;
  start_address: Scalars['String']['input'];
  start_location: LatLngIt;
  steps: Array<DirectionsStepIt>;
  via_waypoint: Array<DirectionsViaWaypointIt>;
};

export type DirectionsPolylineIt = {
  points?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsStepIt = {
  distance?: InputMaybe<TextValueObjectIt>;
  duration: TextValueObjectIt;
  end_location: LatLngIt;
  html_instructions: Scalars['String']['input'];
  maneuver?: InputMaybe<Scalars['String']['input']>;
  polyline: DirectionsPolylineIt;
  start_location: LatLngIt;
  steps?: InputMaybe<Scalars['String']['input']>;
  transit_details?: InputMaybe<DirectionsTransitDetailsIt>;
  travel_mode: Scalars['String']['input'];
};

export type DirectionsTransitAgencyIt = {
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsTransitDetailsIt = {
  arrival_stop?: InputMaybe<DirectionsTransitStopIt>;
  arrival_time?: InputMaybe<TimeZoneTextValueObjectIt>;
  departure_stop?: InputMaybe<DirectionsTransitStopIt>;
  departure_time?: InputMaybe<TimeZoneTextValueObjectIt>;
  headsign?: InputMaybe<Scalars['String']['input']>;
  headway?: InputMaybe<Scalars['Float']['input']>;
  line?: InputMaybe<DirectionsTransitLineIt>;
};

export type DirectionsTransitLineIt = {
  agencies?: InputMaybe<Array<DirectionsTransitAgencyIt>>;
  color?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  short_name?: InputMaybe<Scalars['String']['input']>;
  text_color?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  vehicle?: InputMaybe<DirectionsTransitAgencyIt>;
};

export type DirectionsTransitStopIt = {
  location?: InputMaybe<LatLngIt>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsViaWaypointIt = {
  location?: InputMaybe<LatLngIt>;
  step_index?: InputMaybe<Scalars['Int']['input']>;
  step_interpolation?: InputMaybe<Scalars['Float']['input']>;
};

export type FareIt = {
  currency?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type GeoPointIt = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};

export type GetGoogleMapsDirectionsResponseBodyIt = {
  available_travel_modes?: InputMaybe<Array<Scalars['String']['input']>>;
  error_message?: InputMaybe<Scalars['String']['input']>;
  geocoded_waypoints?: InputMaybe<Array<DirectionsGeocodedWaypointIt>>;
  routes?: InputMaybe<Array<GoogleMapsDirectionsResponseRoutesIt>>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type GetTripsFiltersIt = {
  availableSeats?: InputMaybe<Scalars['Float']['input']>;
  boundaries?: InputMaybe<ScreenGpsBoundariesIt>;
  dropoffAreas?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffCities?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffCountries?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffPostcodes?: InputMaybe<Array<Scalars['String']['input']>>;
  dropoffStreets?: InputMaybe<Array<Scalars['String']['input']>>;
  joinedUsersIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  noneJoinedUsersIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  pickupAreas?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupCities?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupCountries?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupPostcodes?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupStreets?: InputMaybe<Array<Scalars['String']['input']>>;
  plannedAtFrom?: InputMaybe<Scalars['DateTime']['input']>;
  plannedAtTo?: InputMaybe<Scalars['DateTime']['input']>;
  startAtTo?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type GoogleMapsDirectionsResponseRoutesIt = {
  bounds?: InputMaybe<BoundingBoxIt>;
  copyrights?: InputMaybe<Scalars['String']['input']>;
  fare: FareIt;
  legs?: InputMaybe<Array<DirectionsLegIt>>;
  overview_polyline?: InputMaybe<DirectionsPolylineIt>;
  summary?: InputMaybe<Scalars['String']['input']>;
  warnings?: InputMaybe<Array<Scalars['String']['input']>>;
  waypoint_order?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type JoinTripIt = {
  poolerType: Scalars['String']['input'];
  requestedSeatsCount: Scalars['Float']['input'];
};

export type LatLngIt = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginPayloadIt = {
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type NearbyTrips = {
  currentLocation: GeoPointIt;
};

export type OtpLoginPayloadIt = {
  phone: Scalars['String']['input'];
};

export type OtpVerificationPayloadIt = {
  otp: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type ScreenGpsBoundariesIt = {
  bottomLeft: GeoPointIt;
  bottomRight: GeoPointIt;
  topLeft: GeoPointIt;
  topRight: GeoPointIt;
};

export type SignupAppUsersIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type TextValueObjectIt = {
  text?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type TimeZoneTextValueObjectIt = {
  text?: InputMaybe<Scalars['String']['input']>;
  time_zone?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type TripAddressIt = {
  addressLineOne?: InputMaybe<Scalars['String']['input']>;
  addressLineTwo?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postCode?: InputMaybe<Scalars['String']['input']>;
};

export type TripsMetaRequest = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  nearby?: InputMaybe<NearbyTrips>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTripIt = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  dropoffAddress?: InputMaybe<TripAddressIt>;
  dropoffLatitude?: InputMaybe<Scalars['Float']['input']>;
  dropoffLongitude?: InputMaybe<Scalars['Float']['input']>;
  googleDirectionsApiData?: InputMaybe<GetGoogleMapsDirectionsResponseBodyIt>;
  pickupAddress?: InputMaybe<TripAddressIt>;
  pickupLatitude?: InputMaybe<Scalars['Float']['input']>;
  pickupLongitude?: InputMaybe<Scalars['Float']['input']>;
  plannedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateChatMutationVariables = Exact<{
  createChatTripId: Scalars['Int']['input'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'TripChatOt', id: number } };

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
  message: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'TripChatOt', id: number } };

export type ChatByTripIdQueryVariables = Exact<{
  chatTripId: Scalars['Int']['input'];
}>;


export type ChatByTripIdQuery = { __typename?: 'Query', chatByTripId?: { __typename?: 'TripChatOt', id: number, messages?: Array<{ __typename?: 'TripChatMessageOt', createdAt: string, message: string, user: { __typename?: 'AppUsersEntity', id: number, email: string, name: string } }> | null } | null };

export type SendOtpMutationMutationVariables = Exact<{
  sendOTPPayload: OtpLoginPayloadIt;
}>;


export type SendOtpMutationMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'MessageResponseOt', message: string } };

export type VeryOtpMutationMutationVariables = Exact<{
  verifyOTPPayload: OtpVerificationPayloadIt;
}>;


export type VeryOtpMutationMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type CreateTripMutationMutationVariables = Exact<{
  createTripPayload: CreateTripIt;
}>;


export type CreateTripMutationMutation = { __typename?: 'Mutation', createTrip: { __typename?: 'TripsEntity', id: number } };

export type JoinTripMutationMutationVariables = Exact<{
  joinTripId: Scalars['Float']['input'];
  joinTripPayload: JoinTripIt;
}>;


export type JoinTripMutationMutation = { __typename?: 'Mutation', joinTrip: { __typename?: 'TripsEntity', id: number } };

export type LeaveTripMutationMutationVariables = Exact<{
  leaveTripId: Scalars['Float']['input'];
}>;


export type LeaveTripMutationMutation = { __typename?: 'Mutation', leaveTrip: { __typename?: 'TripsEntity', id: number } };

export type MapTripsQueryQueryVariables = Exact<{
  tripsQueryFilters?: InputMaybe<GetTripsFiltersIt>;
  tripsQueryMeta?: InputMaybe<TripsMetaRequest>;
}>;


export type MapTripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, driverId?: number | null, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, area?: string | null, city?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, area?: string | null, city?: string | null }, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type MyTripsQueryQueryVariables = Exact<{
  filters?: InputMaybe<GetTripsFiltersIt>;
  meta?: InputMaybe<TripsMetaRequest>;
}>;


export type MyTripsQueryQuery = { __typename?: 'Query', myTrips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, area?: string | null, city?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, area?: string | null, city?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type SingleTripQueryQueryVariables = Exact<{
  singleTripId: Scalars['Float']['input'];
}>;


export type SingleTripQueryQuery = { __typename?: 'Query', trip: { __typename?: 'TripsEntity', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, driverId?: number | null, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null } } };

export type TripsQueryQueryVariables = Exact<{
  tripsQueryFilters?: InputMaybe<GetTripsFiltersIt>;
  tripsQueryMeta?: InputMaybe<TripsMetaRequest>;
}>;


export type TripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, area?: string | null, city?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, area?: string | null, city?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type LoginMutationMutationVariables = Exact<{
  loginPayload: LoginPayloadIt;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type SignUpMutationMutationVariables = Exact<{
  signUpPayload: SignupAppUsersIt;
}>;


export type SignUpMutationMutation = { __typename?: 'Mutation', signup: { __typename?: 'AppUsersOt', id: number } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'AppUsersOt', id: number, email: string, name: string, phone: string, role: string, status: string } };

export type MapToMapTripFragment = { __typename?: 'TripOt', pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number } & { ' $fragmentName'?: 'MapToMapTripFragment' };

export type MapToTripCardFragment = { __typename?: 'TripOt', capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, pickupAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, city?: string | null, area?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', addressLineOne?: string | null, city?: string | null, area?: string | null } } & { ' $fragmentName'?: 'MapToTripCardFragment' };

export type UseCheckIsUserInTripFragment = { __typename?: 'TripOt', driverId?: number | null, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null } & { ' $fragmentName'?: 'UseCheckIsUserInTripFragment' };

export type GetNewTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type GetNewTokensMutation = { __typename?: 'Mutation', getNewTokens: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = { __typename?: 'Subscription', messageReceivedOnAChat: { __typename?: 'TripChatMessageOverSubscriptionOt', chatId: number, tripId: number, message: string, createdAt: string, fromUser: { __typename?: 'AppUsersEntity', id: number, name: string } } };

export const MapToMapTripFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"mapToMapTrip"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}}]} as unknown as DocumentNode<MapToMapTripFragment, unknown>;
export const MapToTripCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"mapToTripCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}}]}}]}}]} as unknown as DocumentNode<MapToTripCardFragment, unknown>;
export const UseCheckIsUserInTripFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useCheckIsUserInTrip"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UseCheckIsUserInTripFragment, unknown>;
export const CreateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createChatTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createChatTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const ChatByTripIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatByTripId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatByTripId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChatByTripIdQuery, ChatByTripIdQueryVariables>;
export const SendOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpLoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutationMutation, SendOtpMutationMutationVariables>;
export const VeryOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VeryOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerificationPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VeryOtpMutationMutation, VeryOtpMutationMutationVariables>;
export const CreateTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTripMutationMutation, CreateTripMutationMutationVariables>;
export const JoinTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<JoinTripMutationMutation, JoinTripMutationMutationVariables>;
export const LeaveTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"leaveTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaveTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaveTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LeaveTripMutationMutation, LeaveTripMutationMutationVariables>;
export const MapTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MapTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<MapTripsQueryQuery, MapTripsQueryQueryVariables>;
export const MyTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myTrips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<MyTripsQueryQuery, MyTripsQueryQueryVariables>;
export const SingleTripQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleTripQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"singleTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"singleTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}}]}}]} as unknown as DocumentNode<SingleTripQueryQuery, SingleTripQueryQueryVariables>;
export const TripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressLineOne"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TripsQueryQuery, TripsQueryQueryVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const SignUpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupAppUsersIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationMutation, SignUpMutationMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const GetNewTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetNewTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<GetNewTokensMutation, GetNewTokensMutationVariables>;
export const MessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageReceivedOnAChat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"fromUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<MessageSubscription, MessageSubscriptionVariables>;