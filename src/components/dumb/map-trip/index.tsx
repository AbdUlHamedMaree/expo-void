import { Marker } from 'react-native-maps';

import { TripMapMarkerCard } from '../trip-map-marker-card';

import { MaterialCommunityIcon } from '$components/icons';
import { TripRouteModel } from '$fragments/trip-route';
import { pickupDropoffToLatlng } from '$helpers/pickup-dropoff-to-latlng';

export type MapTripProps = TripRouteModel & {
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
