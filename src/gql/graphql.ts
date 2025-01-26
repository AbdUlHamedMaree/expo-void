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

export type AppUsersEntity = {
  __typename?: 'AppUsersEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<UserDocumentsEntity>>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  vehicle?: Maybe<VehiclesEntity>;
};

export type AppUsersOt = {
  __typename?: 'AppUsersOt';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<UserDocumentsEntity>>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  vehicle?: Maybe<VehiclesEntity>;
};

export type BoundingBox = {
  __typename?: 'BoundingBox';
  northeast?: Maybe<LatLng>;
  southwest?: Maybe<LatLng>;
};

export type BoundingBoxIt = {
  northeast?: InputMaybe<LatLngIt>;
  southwest?: InputMaybe<LatLngIt>;
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
  formattedDropoffAddress: Scalars['String']['input'];
  formattedPickupAddress: Scalars['String']['input'];
  googleDirectionsApiData?: InputMaybe<GetGoogleMapsDirectionsResponseBodyIt>;
  pickupAddress: TripAddressIt;
  pickupLatitude: Scalars['Float']['input'];
  pickupLongitude: Scalars['Float']['input'];
  plannedAt: Scalars['DateTime']['input'];
  type: Scalars['String']['input'];
};

export type DirectionsGeocodedWaypoint = {
  __typename?: 'DirectionsGeocodedWaypoint';
  geocoder_status?: Maybe<Scalars['String']['output']>;
  partial_match?: Maybe<Scalars['String']['output']>;
  place_id?: Maybe<Scalars['String']['output']>;
  types?: Maybe<Array<Scalars['String']['output']>>;
};

export type DirectionsGeocodedWaypointIt = {
  geocoder_status?: InputMaybe<Scalars['String']['input']>;
  partial_match?: InputMaybe<Scalars['String']['input']>;
  place_id?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DirectionsLeg = {
  __typename?: 'DirectionsLeg';
  arrival_time?: Maybe<TimeZoneTextValueObject>;
  departure_time?: Maybe<TimeZoneTextValueObject>;
  distance?: Maybe<TextValueObject>;
  duration?: Maybe<TextValueObject>;
  duration_in_traffic?: Maybe<TextValueObject>;
  end_address?: Maybe<Scalars['String']['output']>;
  end_location?: Maybe<LatLng>;
  start_address?: Maybe<Scalars['String']['output']>;
  start_location?: Maybe<LatLng>;
  steps?: Maybe<Array<DirectionsStep>>;
  traffic_speed_entry?: Maybe<Array<Scalars['String']['output']>>;
  via_waypoint?: Maybe<Array<DirectionsViaWaypoint>>;
};

export type DirectionsLegIt = {
  arrival_time?: InputMaybe<TimeZoneTextValueObjectIt>;
  departure_time?: InputMaybe<TimeZoneTextValueObjectIt>;
  distance?: InputMaybe<TextValueObjectIt>;
  duration?: InputMaybe<TextValueObjectIt>;
  duration_in_traffic?: InputMaybe<TextValueObjectIt>;
  end_address?: InputMaybe<Scalars['String']['input']>;
  end_location?: InputMaybe<LatLngIt>;
  start_address?: InputMaybe<Scalars['String']['input']>;
  start_location?: InputMaybe<LatLngIt>;
  steps?: InputMaybe<Array<DirectionsStepIt>>;
  traffic_speed_entry?: InputMaybe<Array<Scalars['String']['input']>>;
  via_waypoint?: InputMaybe<Array<DirectionsViaWaypointIt>>;
};

export type DirectionsPolyline = {
  __typename?: 'DirectionsPolyline';
  points?: Maybe<Scalars['String']['output']>;
};

export type DirectionsPolylineIt = {
  points?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsStep = {
  __typename?: 'DirectionsStep';
  distance?: Maybe<TextValueObject>;
  duration?: Maybe<TextValueObject>;
  end_location?: Maybe<LatLng>;
  html_instructions?: Maybe<Scalars['String']['output']>;
  maneuver?: Maybe<Scalars['String']['output']>;
  polyline?: Maybe<DirectionsPolyline>;
  start_location?: Maybe<LatLng>;
  steps?: Maybe<Scalars['String']['output']>;
  transit_details?: Maybe<DirectionsTransitDetails>;
  travel_mode?: Maybe<Scalars['String']['output']>;
};

export type DirectionsStepIt = {
  distance?: InputMaybe<TextValueObjectIt>;
  duration?: InputMaybe<TextValueObjectIt>;
  end_location?: InputMaybe<LatLngIt>;
  html_instructions?: InputMaybe<Scalars['String']['input']>;
  maneuver?: InputMaybe<Scalars['String']['input']>;
  polyline?: InputMaybe<DirectionsPolylineIt>;
  start_location?: InputMaybe<LatLngIt>;
  steps?: InputMaybe<Scalars['String']['input']>;
  transit_details?: InputMaybe<DirectionsTransitDetailsIt>;
  travel_mode?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsTransitAgency = {
  __typename?: 'DirectionsTransitAgency';
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type DirectionsTransitAgencyIt = {
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsTransitDetails = {
  __typename?: 'DirectionsTransitDetails';
  arrival_stop?: Maybe<DirectionsTransitStop>;
  arrival_time?: Maybe<TimeZoneTextValueObject>;
  departure_stop?: Maybe<DirectionsTransitStop>;
  departure_time?: Maybe<TimeZoneTextValueObject>;
  headsign?: Maybe<Scalars['String']['output']>;
  headway?: Maybe<Scalars['Float']['output']>;
  line?: Maybe<DirectionsTransitLine>;
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

export type DirectionsTransitLine = {
  __typename?: 'DirectionsTransitLine';
  agencies?: Maybe<Array<DirectionsTransitAgency>>;
  color?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  short_name?: Maybe<Scalars['String']['output']>;
  text_color?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<DirectionsTransitAgency>;
};

export type DirectionsTransitLineIt = {
  agencies?: InputMaybe<Array<DirectionsTransitAgencyIt>>;
  color?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  short_name?: InputMaybe<Scalars['String']['input']>;
  text_color?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  vehicle?: InputMaybe<DirectionsTransitAgencyIt>;
};

export type DirectionsTransitStop = {
  __typename?: 'DirectionsTransitStop';
  location?: Maybe<LatLng>;
  name?: Maybe<Scalars['String']['output']>;
};

export type DirectionsTransitStopIt = {
  location?: InputMaybe<LatLngIt>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DirectionsViaWaypoint = {
  __typename?: 'DirectionsViaWaypoint';
  location?: Maybe<LatLng>;
  step_index?: Maybe<Scalars['Int']['output']>;
  step_interpolation?: Maybe<Scalars['Float']['output']>;
};

export type DirectionsViaWaypointIt = {
  location?: InputMaybe<LatLngIt>;
  step_index?: InputMaybe<Scalars['Int']['input']>;
  step_interpolation?: InputMaybe<Scalars['Float']['input']>;
};

export type Fare = {
  __typename?: 'Fare';
  currency?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
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

export type GetGoogleMapsDirectionsResponseBody = {
  __typename?: 'GetGoogleMapsDirectionsResponseBody';
  available_travel_modes?: Maybe<Array<Scalars['String']['output']>>;
  error_message?: Maybe<Scalars['String']['output']>;
  geocoded_waypoints?: Maybe<Array<DirectionsGeocodedWaypoint>>;
  routes?: Maybe<Array<GoogleMapsDirectionsResponseRoutes>>;
  status?: Maybe<Scalars['String']['output']>;
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
  dropoffStreets?: InputMaybe<Array<Scalars['String']['input']>>;
  joinedUsersIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  noneJoinedUsersIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  pickupAreas?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupCities?: InputMaybe<Array<Scalars['String']['input']>>;
  pickupStreets?: InputMaybe<Array<Scalars['String']['input']>>;
  plannedAtFrom?: InputMaybe<Scalars['DateTime']['input']>;
  plannedAtTo?: InputMaybe<Scalars['DateTime']['input']>;
  startAtTo?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type GetTripsOt = {
  __typename?: 'GetTripsOt';
  items: Array<TripOt>;
  meta: MetaResponse;
};

export type GoogleMapsDirectionsResponseRoutes = {
  __typename?: 'GoogleMapsDirectionsResponseRoutes';
  bounds?: Maybe<BoundingBox>;
  copyrights?: Maybe<Scalars['String']['output']>;
  fare?: Maybe<Fare>;
  legs?: Maybe<Array<DirectionsLeg>>;
  overview_polyline?: Maybe<DirectionsPolyline>;
  summary?: Maybe<Scalars['String']['output']>;
  warnings?: Maybe<Array<Scalars['String']['output']>>;
  waypoint_order?: Maybe<Array<Scalars['Int']['output']>>;
};

export type GoogleMapsDirectionsResponseRoutesIt = {
  bounds?: InputMaybe<BoundingBoxIt>;
  copyrights?: InputMaybe<Scalars['String']['input']>;
  fare?: InputMaybe<FareIt>;
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

export type LatLng = {
  __typename?: 'LatLng';
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type LatLngIt = {
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginPayloadIt = {
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponseOt = {
  __typename?: 'LoginResponseOt';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: AppUsersOt;
};

export type MessageResponseOt = {
  __typename?: 'MessageResponseOt';
  message: Scalars['String']['output'];
};

export type MetaResponse = {
  __typename?: 'MetaResponse';
  limit?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  totalCount?: Maybe<Scalars['Float']['output']>;
  totalPages?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: TripChatOt;
  createTrip: TripsEntity;
  createUser: AppUsersOt;
  endTrip: TripsEntity;
  getNewTokens: LoginResponseOt;
  joinTrip: TripsEntity;
  leaveTrip: TripsEntity;
  login: LoginResponseOt;
  resendOtp: MessageResponseOt;
  sendMessage: TripChatOt;
  sendOtp: MessageResponseOt;
  signup: AppUsersOt;
  startTrip: TripsEntity;
  updateProfile: AppUsersOt;
  updateTrip: TripsEntity;
  verifyOtp: LoginResponseOt;
};


export type MutationCreateChatArgs = {
  tripId: Scalars['Int']['input'];
};


export type MutationCreateTripArgs = {
  payload: CreateTripIt;
};


export type MutationCreateUserArgs = {
  payload: CreateAppUsersIt;
};


export type MutationEndTripArgs = {
  id: Scalars['Float']['input'];
};


export type MutationJoinTripArgs = {
  id: Scalars['Float']['input'];
  payload: JoinTripIt;
};


export type MutationLeaveTripArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  payload: LoginPayloadIt;
};


export type MutationResendOtpArgs = {
  payload: OtpLoginPayloadIt;
};


export type MutationSendMessageArgs = {
  chatId: Scalars['Int']['input'];
  message: Scalars['String']['input'];
};


export type MutationSendOtpArgs = {
  payload: OtpLoginPayloadIt;
};


export type MutationSignupArgs = {
  payload: SignupAppUsersIt;
};


export type MutationStartTripArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateProfileArgs = {
  payload: UpdateProfileIt;
};


export type MutationUpdateTripArgs = {
  id: Scalars['Float']['input'];
  payload: UpdateTripIt;
};


export type MutationVerifyOtpArgs = {
  payload: OtpVerificationPayloadIt;
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

export type Query = {
  __typename?: 'Query';
  chat: TripChatOt;
  chatByTripId?: Maybe<TripChatOt>;
  me: AppUsersOt;
  myTrips: GetTripsOt;
  trip: TripsEntity;
  trips: GetTripsOt;
  users: Array<AppUsersOt>;
};


export type QueryChatArgs = {
  id: Scalars['Int']['input'];
};


export type QueryChatByTripIdArgs = {
  tripId: Scalars['Int']['input'];
};


export type QueryMyTripsArgs = {
  filters?: InputMaybe<GetTripsFiltersIt>;
  meta?: InputMaybe<TripsMetaRequest>;
};


export type QueryTripArgs = {
  id: Scalars['Float']['input'];
};


export type QueryTripsArgs = {
  filters?: InputMaybe<GetTripsFiltersIt>;
  meta?: InputMaybe<TripsMetaRequest>;
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

export type Subscription = {
  __typename?: 'Subscription';
  messageReceivedOnAChat: TripChatMessageOverSubscriptionOt;
};

export type TextValueObject = {
  __typename?: 'TextValueObject';
  text?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type TextValueObjectIt = {
  text?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type TimeZoneTextValueObject = {
  __typename?: 'TimeZoneTextValueObject';
  text?: Maybe<Scalars['String']['output']>;
  time_zone?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type TimeZoneTextValueObjectIt = {
  text?: InputMaybe<Scalars['String']['input']>;
  time_zone?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type TripAddressIt = {
  area: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type TripAddressOt = {
  __typename?: 'TripAddressOt';
  area: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type TripChatMessageOt = {
  __typename?: 'TripChatMessageOt';
  createdAt: Scalars['String']['output'];
  message: Scalars['String']['output'];
  user: AppUsersEntity;
};

export type TripChatMessageOverSubscriptionOt = {
  __typename?: 'TripChatMessageOverSubscriptionOt';
  chatId: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  fromUser: AppUsersEntity;
  message: Scalars['String']['output'];
  tripId: Scalars['Float']['output'];
};

export type TripChatOt = {
  __typename?: 'TripChatOt';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  messages?: Maybe<Array<TripChatMessageOt>>;
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TripOt = {
  __typename?: 'TripOt';
  capacity?: Maybe<Scalars['Float']['output']>;
  category: Scalars['String']['output'];
  chat?: Maybe<TripsChatEntity>;
  checkpoints?: Maybe<Array<TripsCheckpoints>>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['Float']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  formattedDropoffAddress: Scalars['String']['output'];
  formattedPickupAddress: Scalars['String']['output'];
  googleDirectionsApiData?: Maybe<GetGoogleMapsDirectionsResponseBody>;
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
  plannedAt: Scalars['DateTime']['output'];
  reservations?: Maybe<Array<TripReservationOt>>;
  riders?: Maybe<Array<AppUsersEntity>>;
  seatsStatus: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  timeline?: Maybe<Array<TripsTimelineEntity>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type TripReservationOt = {
  __typename?: 'TripReservationOt';
  createdAt?: Maybe<Scalars['String']['output']>;
  poolerType: Scalars['String']['output'];
  requestedSeatsCount: Scalars['Float']['output'];
  userId: Scalars['Float']['output'];
};

export type TripsChatEntity = {
  __typename?: 'TripsChatEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  messages?: Maybe<Array<TripChatMessageOt>>;
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TripsCheckpoints = {
  __typename?: 'TripsCheckpoints';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TripsEntity = {
  __typename?: 'TripsEntity';
  capacity?: Maybe<Scalars['Float']['output']>;
  category: Scalars['String']['output'];
  chat?: Maybe<TripsChatEntity>;
  checkpoints?: Maybe<Array<TripsCheckpoints>>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['Float']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver?: Maybe<AppUsersEntity>;
  driverId?: Maybe<Scalars['Float']['output']>;
  dropoffAddress: TripAddressOt;
  dropoffLatitude: Scalars['Float']['output'];
  dropoffLongitude: Scalars['Float']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  formattedDropoffAddress: Scalars['String']['output'];
  formattedPickupAddress: Scalars['String']['output'];
  googleDirectionsApiData?: Maybe<GetGoogleMapsDirectionsResponseBody>;
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  passengers?: Maybe<Array<AppUsersEntity>>;
  pickupAddress: TripAddressOt;
  pickupLatitude: Scalars['Float']['output'];
  pickupLongitude: Scalars['Float']['output'];
  plannedAt: Scalars['DateTime']['output'];
  reservations?: Maybe<Array<TripReservationOt>>;
  riders?: Maybe<Array<AppUsersEntity>>;
  seatsStatus: Scalars['String']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  timeline?: Maybe<Array<TripsTimelineEntity>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type TripsMetaRequest = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  nearby?: InputMaybe<NearbyTrips>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type TripsTimelineEntity = {
  __typename?: 'TripsTimelineEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  occupiedSeats?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  trip?: Maybe<TripsEntity>;
  tripId?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateProfileIt = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateTripIt = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  dropoffAddress?: InputMaybe<TripAddressIt>;
  dropoffLatitude?: InputMaybe<Scalars['Float']['input']>;
  dropoffLongitude?: InputMaybe<Scalars['Float']['input']>;
  formattedDropoffAddress?: InputMaybe<Scalars['String']['input']>;
  formattedPickupAddress?: InputMaybe<Scalars['String']['input']>;
  googleDirectionsApiData?: InputMaybe<GetGoogleMapsDirectionsResponseBodyIt>;
  pickupAddress?: InputMaybe<TripAddressIt>;
  pickupLatitude?: InputMaybe<Scalars['Float']['input']>;
  pickupLongitude?: InputMaybe<Scalars['Float']['input']>;
  plannedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UserDocumentsEntity = {
  __typename?: 'UserDocumentsEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expiryDate: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  issuer: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user: AppUsersEntity;
  userId: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type VehiclesEntity = {
  __typename?: 'VehiclesEntity';
  brand: Scalars['String']['output'];
  capacity: Scalars['Float']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  driver: AppUsersEntity;
  driverId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  image?: Maybe<Scalars['String']['output']>;
  insuranceExpiryDate: Scalars['DateTime']['output'];
  model: Scalars['String']['output'];
  name: Scalars['String']['output'];
  plateNumber: Scalars['String']['output'];
  registrationExpiryDate: Scalars['DateTime']['output'];
  registrationNumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
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

export type EndTripMutationVariables = Exact<{
  endTripId: Scalars['Float']['input'];
}>;


export type EndTripMutation = { __typename?: 'Mutation', endTrip: { __typename?: 'TripsEntity', id: number } };

export type JoinTripMutationMutationVariables = Exact<{
  joinTripId: Scalars['Float']['input'];
  joinTripPayload: JoinTripIt;
}>;


export type JoinTripMutationMutation = { __typename?: 'Mutation', joinTrip: { __typename?: 'TripsEntity', id: number } };

export type LeaveTripMutationMutationVariables = Exact<{
  leaveTripId: Scalars['Float']['input'];
}>;


export type LeaveTripMutationMutation = { __typename?: 'Mutation', leaveTrip: { __typename?: 'TripsEntity', id: number } };

export type StartTripMutationVariables = Exact<{
  startTripId: Scalars['Float']['input'];
}>;


export type StartTripMutation = { __typename?: 'Mutation', startTrip: { __typename?: 'TripsEntity', id: number } };

export type MapTripsQueryQueryVariables = Exact<{
  tripsQueryFilters?: InputMaybe<GetTripsFiltersIt>;
  tripsQueryMeta?: InputMaybe<TripsMetaRequest>;
}>;


export type MapTripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, driverId?: number | null, formattedPickupAddress: string, pickupLatitude: number, pickupLongitude: number, formattedDropoffAddress: string, dropoffLatitude: number, dropoffLongitude: number, pickupAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null }, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type MyTripsQueryQueryVariables = Exact<{
  filters?: InputMaybe<GetTripsFiltersIt>;
  meta?: InputMaybe<TripsMetaRequest>;
}>;


export type MyTripsQueryQuery = { __typename?: 'Query', myTrips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, pickupAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

export type SingleTripQueryQueryVariables = Exact<{
  singleTripId: Scalars['Float']['input'];
}>;


export type SingleTripQueryQuery = { __typename?: 'Query', trip: { __typename?: 'TripsEntity', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, driverId?: number | null, status: string, formattedPickupAddress: string, pickupLatitude: number, pickupLongitude: number, formattedDropoffAddress: string, dropoffLatitude: number, dropoffLongitude: number, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null } };

export type TripsQueryQueryVariables = Exact<{
  tripsQueryFilters?: InputMaybe<GetTripsFiltersIt>;
  tripsQueryMeta?: InputMaybe<TripsMetaRequest>;
}>;


export type TripsQueryQuery = { __typename?: 'Query', trips: { __typename?: 'GetTripsOt', items: Array<{ __typename?: 'TripOt', id: number, capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, formattedPickupAddress: string, formattedDropoffAddress: string, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null, googleDirectionsApiData?: { __typename?: 'GetGoogleMapsDirectionsResponseBody', routes?: Array<{ __typename?: 'GoogleMapsDirectionsResponseRoutes', overview_polyline?: { __typename?: 'DirectionsPolyline', points?: string | null } | null, legs?: Array<{ __typename?: 'DirectionsLeg', steps?: Array<{ __typename?: 'DirectionsStep', steps?: string | null, distance?: { __typename?: 'TextValueObject', text?: string | null, value?: number | null } | null, duration?: { __typename?: 'TextValueObject', text?: string | null, value?: number | null } | null, start_location?: { __typename?: 'LatLng', lat?: number | null, lng?: number | null } | null, end_location?: { __typename?: 'LatLng', lat?: number | null, lng?: number | null } | null, polyline?: { __typename?: 'DirectionsPolyline', points?: string | null } | null, transit_details?: { __typename?: 'DirectionsTransitDetails', departure_time?: { __typename?: 'TimeZoneTextValueObject', text?: string | null, time_zone?: string | null, value?: number | null } | null, departure_stop?: { __typename?: 'DirectionsTransitStop', name?: string | null, location?: { __typename?: 'LatLng', lat?: number | null, lng?: number | null } | null } | null, arrival_time?: { __typename?: 'TimeZoneTextValueObject', text?: string | null, time_zone?: string | null, value?: number | null } | null, arrival_stop?: { __typename?: 'DirectionsTransitStop', name?: string | null, location?: { __typename?: 'LatLng', lat?: number | null, lng?: number | null } | null } | null } | null }> | null }> | null, fare?: { __typename?: 'Fare', currency?: string | null, text?: string | null, value?: number | null } | null, bounds?: { __typename?: 'BoundingBox', northeast?: { __typename?: 'LatLng', lat?: number | null, lng?: number | null } | null, southwest?: { __typename?: 'LatLng', lat?: number | null, lng?: number | null } | null } | null }> | null } | null, pickupAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', area: string, city: string, street?: string | null } }>, meta: { __typename?: 'MetaResponse', limit?: number | null, page?: number | null, totalCount?: number | null, totalPages?: number | null } } };

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

export type MapToMapTripFragment = { __typename?: 'TripOt', id: number, pickupLatitude: number, pickupLongitude: number, dropoffLatitude: number, dropoffLongitude: number } & { ' $fragmentName'?: 'MapToMapTripFragment' };

export type MapToTripCardFragment = { __typename?: 'TripOt', capacity?: number | null, occupiedSeats?: number | null, plannedAt: any, formattedPickupAddress: string, formattedDropoffAddress: string, pickupAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null }, dropoffAddress: { __typename?: 'TripAddressOt', city: string, area: string, street?: string | null } } & { ' $fragmentName'?: 'MapToTripCardFragment' };

export type UseCheckIsUserInTripFragment = { __typename?: 'TripOt', driverId?: number | null, passengers?: Array<{ __typename?: 'AppUsersEntity', id: number }> | null } & { ' $fragmentName'?: 'UseCheckIsUserInTripFragment' };

export type GetNewTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type GetNewTokensMutation = { __typename?: 'Mutation', getNewTokens: { __typename?: 'LoginResponseOt', accessToken: string, refreshToken: string } };

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = { __typename?: 'Subscription', messageReceivedOnAChat: { __typename?: 'TripChatMessageOverSubscriptionOt', chatId: number, tripId: number, message: string, createdAt: string, fromUser: { __typename?: 'AppUsersEntity', id: number, name: string } } };

export const MapToMapTripFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"mapToMapTrip"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}}]} as unknown as DocumentNode<MapToMapTripFragment, unknown>;
export const MapToTripCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"mapToTripCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPickupAddress"}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"formattedDropoffAddress"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}}]} as unknown as DocumentNode<MapToTripCardFragment, unknown>;
export const UseCheckIsUserInTripFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"useCheckIsUserInTrip"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TripOt"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UseCheckIsUserInTripFragment, unknown>;
export const CreateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createChatTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createChatTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const ChatByTripIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatByTripId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatByTripId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChatByTripIdQuery, ChatByTripIdQueryVariables>;
export const SendOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpLoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutationMutation, SendOtpMutationMutationVariables>;
export const VeryOtpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VeryOTPMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerificationPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOTPPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<VeryOtpMutationMutation, VeryOtpMutationMutationVariables>;
export const CreateTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTripMutationMutation, CreateTripMutationMutationVariables>;
export const EndTripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EndTrip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EndTripMutation, EndTripMutationVariables>;
export const JoinTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"joinTripPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JoinTripIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"joinTripPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<JoinTripMutationMutation, JoinTripMutationMutationVariables>;
export const LeaveTripMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"leaveTripMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaveTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaveTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LeaveTripMutationMutation, LeaveTripMutationMutationVariables>;
export const StartTripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartTrip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StartTripMutation, StartTripMutationVariables>;
export const MapTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MapTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"formattedPickupAddress"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"formattedDropoffAddress"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<MapTripsQueryQuery, MapTripsQueryQueryVariables>;
export const MyTripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myTrips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<MyTripsQueryQuery, MyTripsQueryQueryVariables>;
export const SingleTripQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleTripQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"singleTripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"singleTripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"driverId"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"formattedPickupAddress"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"pickupLongitude"}},{"kind":"Field","name":{"kind":"Name","value":"formattedDropoffAddress"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLatitude"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffLongitude"}}]}}]}}]} as unknown as DocumentNode<SingleTripQueryQuery, SingleTripQueryQueryVariables>;
export const TripsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TripsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTripsFiltersIt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TripsMetaRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryFilters"}}},{"kind":"Argument","name":{"kind":"Name","value":"meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripsQueryMeta"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"occupiedSeats"}},{"kind":"Field","name":{"kind":"Name","value":"plannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passengers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"googleDirectionsApiData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"routes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overview_polyline"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"end_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"polyline"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"}}]}},{"kind":"Field","name":{"kind":"Name","value":"steps"}},{"kind":"Field","name":{"kind":"Name","value":"transit_details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"departure_time"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"time_zone"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"departure_stop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrival_time"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"time_zone"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrival_stop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fare"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"northeast"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"southwest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pickupAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"formattedPickupAddress"}},{"kind":"Field","name":{"kind":"Name","value":"dropoffAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"formattedDropoffAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<TripsQueryQuery, TripsQueryQueryVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginPayloadIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const SignUpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupAppUsersIt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signUpPayload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationMutation, SignUpMutationMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const GetNewTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetNewTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<GetNewTokensMutation, GetNewTokensMutationVariables>;
export const MessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageReceivedOnAChat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"fromUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<MessageSubscription, MessageSubscriptionVariables>;