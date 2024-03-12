/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateChat($createChatTripId: Int!) {\n    createChat(tripId: $createChatTripId) {\n      id\n    }\n  }\n": types.CreateChatDocument,
    "\n  mutation SendMessage($chatId: Int!, $message: String!) {\n    sendMessage(chatId: $chatId, message: $message) {\n      id\n    }\n  }\n": types.SendMessageDocument,
    "\n  query ChatByTripId($chatTripId: Int!) {\n    chatByTripId(tripId: $chatTripId) {\n      id\n      messages {\n        createdAt\n        message\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n": types.ChatByTripIdDocument,
    "\n  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {\n    sendOtp(payload: $sendOTPPayload) {\n      message\n    }\n  }\n": types.SendOtpMutationDocument,
    "\n  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {\n    verifyOtp(payload: $verifyOTPPayload) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.VeryOtpMutationDocument,
    "\n  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {\n    createTrip(payload: $createTripPayload) {\n      id\n    }\n  }\n": types.CreateTripMutationDocument,
    "\n  mutation JoinTripMutation($joinTripId: Float!, $joinTripPayload: JoinTripIt!) {\n    joinTrip(id: $joinTripId, payload: $joinTripPayload) {\n      id\n    }\n  }\n": types.JoinTripMutationDocument,
    "\n  query MapTripsQuery(\n    $tripsQueryFilters: GetTripsFiltersIt\n    $tripsQueryMeta: TripsMetaRequest\n  ) {\n    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        plannedAt\n\n        pickupAddress {\n          addressLineOne\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n": types.MapTripsQueryDocument,
    "\n  query SingleTripQuery($singleTripId: Float!) {\n    trip(id: $singleTripId) {\n      id\n      capacity\n      occupiedSeats\n      plannedAt\n\n      driverId\n      passengers {\n        id\n      }\n\n      pickupAddress {\n        addressLineOne\n      }\n      pickupLatitude\n      pickupLongitude\n\n      dropoffAddress {\n        addressLineOne\n      }\n      dropoffLatitude\n      dropoffLongitude\n    }\n  }\n": types.SingleTripQueryDocument,
    "\n  query TripsQuery(\n    $tripsQueryFilters: GetTripsFiltersIt\n    $tripsQueryMeta: TripsMetaRequest\n  ) {\n    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        plannedAt\n        passengers {\n          id\n        }\n\n        pickupAddress {\n          addressLineOne\n        }\n\n        dropoffAddress {\n          addressLineOne\n        }\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n": types.TripsQueryDocument,
    "\n  mutation LoginMutation($loginPayload: LoginPayloadIt!) {\n    login(payload: $loginPayload) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginMutationDocument,
    "\n  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {\n    signup(payload: $signUpPayload) {\n      id\n    }\n  }\n": types.SignUpMutationDocument,
    "\n  query MeQuery {\n    me {\n      id\n      email\n      name\n      phone\n      role\n      status\n    }\n  }\n": types.MeQueryDocument,
    "\n  fragment TripCard on TripOt {\n    capacity\n    occupiedSeats\n    plannedAt\n\n    pickupAddress {\n      addressLineOne\n    }\n\n    dropoffAddress {\n      addressLineOne\n    }\n  }\n": types.TripCardFragmentDoc,
    "\n  fragment TripRoute on TripOt {\n    pickupLatitude\n    pickupLongitude\n\n    dropoffLatitude\n    dropoffLongitude\n  }\n": types.TripRouteFragmentDoc,
    "\n  fragment UseIsUserPartOfTheTrip on TripOt {\n    driverId\n\n    passengers {\n      id\n    }\n  }\n": types.UseIsUserPartOfTheTripFragmentDoc,
    "\n  mutation GetNewTokens {\n    getNewTokens {\n      accessToken\n      refreshToken\n    }\n  }\n": types.GetNewTokensDocument,
    "\n  subscription Message {\n    messageReceivedOnAChat {\n      chatId\n      tripId\n      fromUser {\n        id\n        name\n      }\n      message\n      createdAt\n    }\n  }\n": types.MessageDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateChat($createChatTripId: Int!) {\n    createChat(tripId: $createChatTripId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChat($createChatTripId: Int!) {\n    createChat(tripId: $createChatTripId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMessage($chatId: Int!, $message: String!) {\n    sendMessage(chatId: $chatId, message: $message) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($chatId: Int!, $message: String!) {\n    sendMessage(chatId: $chatId, message: $message) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ChatByTripId($chatTripId: Int!) {\n    chatByTripId(tripId: $chatTripId) {\n      id\n      messages {\n        createdAt\n        message\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ChatByTripId($chatTripId: Int!) {\n    chatByTripId(tripId: $chatTripId) {\n      id\n      messages {\n        createdAt\n        message\n        user {\n          id\n          email\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {\n    sendOtp(payload: $sendOTPPayload) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation SendOTPMutation($sendOTPPayload: OtpLoginPayloadIt!) {\n    sendOtp(payload: $sendOTPPayload) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {\n    verifyOtp(payload: $verifyOTPPayload) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation VeryOTPMutation($verifyOTPPayload: OtpVerificationPayloadIt!) {\n    verifyOtp(payload: $verifyOTPPayload) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {\n    createTrip(payload: $createTripPayload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTripMutation($createTripPayload: CreateTripIt!) {\n    createTrip(payload: $createTripPayload) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation JoinTripMutation($joinTripId: Float!, $joinTripPayload: JoinTripIt!) {\n    joinTrip(id: $joinTripId, payload: $joinTripPayload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation JoinTripMutation($joinTripId: Float!, $joinTripPayload: JoinTripIt!) {\n    joinTrip(id: $joinTripId, payload: $joinTripPayload) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MapTripsQuery(\n    $tripsQueryFilters: GetTripsFiltersIt\n    $tripsQueryMeta: TripsMetaRequest\n  ) {\n    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        plannedAt\n\n        pickupAddress {\n          addressLineOne\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query MapTripsQuery(\n    $tripsQueryFilters: GetTripsFiltersIt\n    $tripsQueryMeta: TripsMetaRequest\n  ) {\n    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        plannedAt\n\n        pickupAddress {\n          addressLineOne\n        }\n        pickupLatitude\n        pickupLongitude\n\n        dropoffAddress {\n          addressLineOne\n        }\n        dropoffLatitude\n        dropoffLongitude\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SingleTripQuery($singleTripId: Float!) {\n    trip(id: $singleTripId) {\n      id\n      capacity\n      occupiedSeats\n      plannedAt\n\n      driverId\n      passengers {\n        id\n      }\n\n      pickupAddress {\n        addressLineOne\n      }\n      pickupLatitude\n      pickupLongitude\n\n      dropoffAddress {\n        addressLineOne\n      }\n      dropoffLatitude\n      dropoffLongitude\n    }\n  }\n"): (typeof documents)["\n  query SingleTripQuery($singleTripId: Float!) {\n    trip(id: $singleTripId) {\n      id\n      capacity\n      occupiedSeats\n      plannedAt\n\n      driverId\n      passengers {\n        id\n      }\n\n      pickupAddress {\n        addressLineOne\n      }\n      pickupLatitude\n      pickupLongitude\n\n      dropoffAddress {\n        addressLineOne\n      }\n      dropoffLatitude\n      dropoffLongitude\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TripsQuery(\n    $tripsQueryFilters: GetTripsFiltersIt\n    $tripsQueryMeta: TripsMetaRequest\n  ) {\n    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        plannedAt\n        passengers {\n          id\n        }\n\n        pickupAddress {\n          addressLineOne\n        }\n\n        dropoffAddress {\n          addressLineOne\n        }\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query TripsQuery(\n    $tripsQueryFilters: GetTripsFiltersIt\n    $tripsQueryMeta: TripsMetaRequest\n  ) {\n    trips(filters: $tripsQueryFilters, meta: $tripsQueryMeta) {\n      items {\n        id\n        capacity\n        occupiedSeats\n        plannedAt\n        passengers {\n          id\n        }\n\n        pickupAddress {\n          addressLineOne\n        }\n\n        dropoffAddress {\n          addressLineOne\n        }\n      }\n      meta {\n        limit\n        page\n        totalCount\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginMutation($loginPayload: LoginPayloadIt!) {\n    login(payload: $loginPayload) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation LoginMutation($loginPayload: LoginPayloadIt!) {\n    login(payload: $loginPayload) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {\n    signup(payload: $signUpPayload) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SignUpMutation($signUpPayload: SignupAppUsersIt!) {\n    signup(payload: $signUpPayload) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MeQuery {\n    me {\n      id\n      email\n      name\n      phone\n      role\n      status\n    }\n  }\n"): (typeof documents)["\n  query MeQuery {\n    me {\n      id\n      email\n      name\n      phone\n      role\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TripCard on TripOt {\n    capacity\n    occupiedSeats\n    plannedAt\n\n    pickupAddress {\n      addressLineOne\n    }\n\n    dropoffAddress {\n      addressLineOne\n    }\n  }\n"): (typeof documents)["\n  fragment TripCard on TripOt {\n    capacity\n    occupiedSeats\n    plannedAt\n\n    pickupAddress {\n      addressLineOne\n    }\n\n    dropoffAddress {\n      addressLineOne\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TripRoute on TripOt {\n    pickupLatitude\n    pickupLongitude\n\n    dropoffLatitude\n    dropoffLongitude\n  }\n"): (typeof documents)["\n  fragment TripRoute on TripOt {\n    pickupLatitude\n    pickupLongitude\n\n    dropoffLatitude\n    dropoffLongitude\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment UseIsUserPartOfTheTrip on TripOt {\n    driverId\n\n    passengers {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment UseIsUserPartOfTheTrip on TripOt {\n    driverId\n\n    passengers {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation GetNewTokens {\n    getNewTokens {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation GetNewTokens {\n    getNewTokens {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Message {\n    messageReceivedOnAChat {\n      chatId\n      tripId\n      fromUser {\n        id\n        name\n      }\n      message\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription Message {\n    messageReceivedOnAChat {\n      chatId\n      tripId\n      fromUser {\n        id\n        name\n      }\n      message\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;