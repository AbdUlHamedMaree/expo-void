import pick from 'lodash/fp/pick';
import { Marker } from 'react-native-maps';

import { TripMapMarkerCard } from '../trip-map-marker-card';

import { MaterialCommunityIcon } from '$components/icons';
import { gql } from '$gql';
import { pickupDropoffToLatlng } from '$helpers/pickup-dropoff-to-latlng';
import type { FragmentModel } from '$types/fragment-model';

const fragment = gql(/* GraphQL */ `
  fragment mapToMapTrip on TripOt {
    id
    pickupLatitude
    pickupLongitude
    dropoffLatitude
    dropoffLongitude
  }
`);

type Trip = FragmentModel<typeof fragment>;

export const mapToMapTrip = pick<Trip, keyof Trip>([
  'id',
  'pickupLatitude',
  'pickupLongitude',
  'dropoffLatitude',
  'dropoffLongitude',
]);

export type MapTripProps = Trip & {
  onPickupMarkerClick?: () => void;
  onDropoffMarkerClick?: () => void;
};

export const getMapTrip = ({
  id,
  pickupLatitude,
  pickupLongitude,
  dropoffLatitude,
  dropoffLongitude,

  onPickupMarkerClick,
  onDropoffMarkerClick,
}: MapTripProps) => {
  const locations = pickupDropoffToLatlng({
    pickupLatitude,
    pickupLongitude,
    dropoffLatitude,
    dropoffLongitude,
  });

  return {
    pickup: (
      <Marker
        key={`${id}-pickup`}
        onPress={onPickupMarkerClick}
        coordinate={locations.pickup}
        tracksViewChanges={false}
      >
        <TripMapMarkerCard>
          <MaterialCommunityIcon name='car' size={18} />
        </TripMapMarkerCard>
      </Marker>
    ),
    dropoff: (
      <Marker
        key={`${id}-dropoff`}
        onPress={onDropoffMarkerClick}
        coordinate={locations.dropoff}
        tracksViewChanges={false}
      >
        <TripMapMarkerCard>
          <MaterialCommunityIcon name='flag-checkered' size={18} />
        </TripMapMarkerCard>
      </Marker>
    ),
  };
};
