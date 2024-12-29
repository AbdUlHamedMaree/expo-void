import pick from 'lodash/fp/pick';
import { Marker } from 'react-native-maps';

import { TripMapMarkerCard } from '../trip-map-marker-card';

import { MaterialCommunityIcon } from '$components/icons';
import { gql } from '$gql';
import { pickupDropoffToLatlng } from '$helpers/pickup-dropoff-to-latlng';
import type { FragmentModel } from '$types/fragment-model';

const fragment = gql(/* GraphQL */ `
  fragment mapToMapTrip on TripOt {
    pickupLatitude
    pickupLongitude
    dropoffLatitude
    dropoffLongitude
  }
`);

type Trip = FragmentModel<typeof fragment>;

export const mapToMapTrip = pick<Trip, keyof Trip>([
  'pickupLatitude',
  'pickupLongitude',
  'dropoffLatitude',
  'dropoffLongitude',
]);

export type MapTripProps = Trip & {
  onPickupMarkerClick?: () => void;
  onDropoffMarkerClick?: () => void;
};

export const MapTrip: React.FC<MapTripProps> = ({
  pickupLatitude,
  pickupLongitude,
  dropoffLatitude,
  dropoffLongitude,

  onPickupMarkerClick,
  onDropoffMarkerClick,
}) => {
  const locations = pickupDropoffToLatlng({
    pickupLatitude,
    pickupLongitude,
    dropoffLatitude,
    dropoffLongitude,
  });

  return (
    <>
      <Marker
        onPress={onPickupMarkerClick}
        coordinate={locations.pickup}
        tracksViewChanges={false}
      >
        <TripMapMarkerCard>
          <MaterialCommunityIcon name='car' size={18} />
        </TripMapMarkerCard>
      </Marker>

      <Marker
        onPress={onDropoffMarkerClick}
        coordinate={locations.dropoff}
        tracksViewChanges={false}
      >
        <TripMapMarkerCard>
          <MaterialCommunityIcon name='flag-checkered' size={18} />
        </TripMapMarkerCard>
      </Marker>
    </>
  );
};
