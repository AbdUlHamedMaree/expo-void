import axios, { AxiosRequestConfig } from 'axios';
import { LatLng } from 'react-native-maps';

export type GoogleDirectionsLatLng = {
  lat: number;
  lng: number;
};

export type GoogleDirectionsBoundingBox = {
  northeast: GoogleDirectionsLatLng;
  southwest: GoogleDirectionsLatLng;
};

export type TravelModeUnion = 'DRIVING' | 'BICYCLING' | 'TRANSIT' | 'WALKING';

export type TextValueObject = {
  text: string;
  value: number;
};

export type TimeZoneTextValueObject = TextValueObject & {
  time_zone: string;
};

export type DirectionsTransitStop = {
  location: GoogleDirectionsLatLng;
  name: string;
};

export type DirectionsTransitAgency = {
  name?: string;
  phone?: string;
  url?: string;
};

export type DirectionsTransitVehicle = {
  name: string;
  // later
  type: string;
  icon?: string;
  local_icon?: string;
};

export type DirectionsTransitLine = {
  agencies: DirectionsTransitAgency[];
  name: string;
  color?: string;
  icon?: string;
  short_name?: string;
  text_color?: string;
  url?: string;
  vehicle?: DirectionsTransitVehicle;
};

export type DirectionsTransitDetails = {
  arrival_stop?: DirectionsTransitStop;
  arrival_time?: TimeZoneTextValueObject;
  departure_stop?: DirectionsTransitStop;
  departure_time?: TimeZoneTextValueObject;
  headsign?: string;
  headway?: number;
  line?: DirectionsTransitLine;
};

export type DirectionsStep = {
  duration: TextValueObject;
  end_location: GoogleDirectionsLatLng;
  html_instructions: string;
  polyline: DirectionsPolyline;
  start_location: GoogleDirectionsLatLng;
  travel_mode: TravelModeUnion;
  distance?: TextValueObject;
  maneuver?: string;
  // not found
  steps?: any;
  transit_details?: DirectionsTransitDetails;
};

export type DirectionsViaWaypoint = {
  location?: GoogleDirectionsLatLng;
  step_index?: number;
  step_interpolation?: number;
};

export type DirectionsLeg = {
  end_address: string;
  end_location: GoogleDirectionsLatLng;
  start_address: string;
  start_location: GoogleDirectionsLatLng;
  steps: DirectionsStep[];
  via_waypoint: DirectionsViaWaypoint[];
  arrival_time?: TimeZoneTextValueObject;
  departure_time?: TimeZoneTextValueObject;
  distance?: TextValueObject;
  duration?: TextValueObject;
  duration_in_traffic: TextValueObject;
};

export type DirectionsPolyline = {
  points: string;
};

export type Fare = {
  currency: string;
  text: string;
  value: number;
};

export type GoogleMapsDirectionsResponseRoutes = {
  bounds: GoogleDirectionsBoundingBox;
  copyrights: string;
  legs: DirectionsLeg[];
  overview_polyline: DirectionsPolyline;
  summary: string;
  warnings: string[];
  waypoint_order: number[];
  fare?: Fare;
};

export type DirectionsGeocodedWaypoint = {
  geocoder_status?: 'Ok' | 'ZERO_RESULTS';
  // not found
  partial_match?: any;
  place_id?: string;
  types?: (
    | 'administrative_area_level_1'
    | 'administrative_area_level_2'
    | 'administrative_area_level_3'
    | 'administrative_area_level_4'
    | 'administrative_area_level_5'
    | 'airport'
    | 'colloquial_area'
    | 'country'
    | 'intersection'
    | 'locality'
    | 'natural_feature'
    | 'neighborhood'
    | 'park'
    | 'plus_code'
    | 'point_of_interest'
    | 'political'
    | 'postal_code'
    | 'premise'
    | 'route'
    | 'street_address'
    | 'sublocality'
    | 'subpremise'
    | 'tourist_attraction'
    | 'train_station'
    | 'transit_station'
  )[];
};

export type GetGoogleMapsDirectionsResponseBody = {
  routes: GoogleMapsDirectionsResponseRoutes[];
  status:
    | 'OK'
    | 'NOT_FOUND'
    | 'ZERO_RESULTS'
    | 'MAX_WAYPOINTS_EXCEEDED'
    | 'MAX_ROUTE_LENGTH_EXCEEDED'
    | 'INVALID_REQUEST'
    | 'OVER_DAILY_LIMIT'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'UNKNOWN_ERROR';
  available_travel_modes?: TravelModeUnion[];
  error_message?: string;
  geocoded_waypoints?: DirectionsGeocodedWaypoint[];
};

export type GetGoogleMapsDirectionsArg = {
  origin?: LatLng;
  destination?: LatLng;

  alternatives?: boolean;
  departureTime?: number;
  arrivalTime?: number;
  avoid?: 'tolls' | 'highways' | 'ferries' | 'indoor';
  language?: string;
  mode?: 'driving' | 'bicycling' | 'transit' | 'walking';
  region?: string;
  trafficModel?: 'best_guess' | 'pessimistic' | 'optimistic';
  transitMode?: 'bus' | 'subway' | 'train' | 'tram' | 'rail';
  transitRoutingPreference?: 'less_walking' | 'fewer_transfers';
  units?: 'metric' | 'imperial';
  waypoints?: GoogleDirectionsLatLng[];

  optimizeWaypoints?: boolean;
};
export const getGoogleMapsDirections = (
  {
    origin,
    destination,

    alternatives,
    departureTime,
    arrivalTime,
    avoid,
    language = 'en',
    mode = 'driving',
    region,
    trafficModel,
    transitMode,
    transitRoutingPreference,
    units,
    waypoints,

    optimizeWaypoints,
  }: GetGoogleMapsDirectionsArg = {},
  config?: AxiosRequestConfig
) => {
  const stringifiedWaypoints = waypoints?.map(getLatLngString).join('|');

  return axios.get<GetGoogleMapsDirectionsResponseBody>(
    'https://maps.googleapis.com/maps/api/directions/json',
    {
      ...config,
      params: {
        key: process.env.EXPO_PUBLIC_GOOGLE_SERVICES_API_KEY,

        origin: origin ? getLatLngString(origin) : '',
        destination: destination ? getLatLngString(destination) : '',

        alternatives,
        departureTime,
        arrivalTime,
        avoid,
        language,
        mode,
        region,

        trafficModel,
        transitMode,
        transitRoutingPreference,
        units,

        waypoints:
          optimizeWaypoints && stringifiedWaypoints
            ? `optimize:true|${stringifiedWaypoints}`
            : stringifiedWaypoints,

        ...config?.params,
      },
    }
  );
};

const getLatLngString = (latlng: LatLng | GoogleDirectionsLatLng) =>
  ('lat' in latlng ? [latlng.lat, latlng.lng] : [latlng.latitude, latlng.longitude]).join(
    ','
  );
