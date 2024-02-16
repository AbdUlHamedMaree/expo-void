import { Region } from 'react-native-maps';

import { atomWithAsyncStorage } from '$libs/jotai/atom-with-async-storage';

// dubai initial location
export const mapRegionAtom = atomWithAsyncStorage<Region>('map-region', {
  longitudeDelta: 0.15110325068235397,
  latitudeDelta: 0.1793406486560123,
  longitude: 55.26689613237977,
  latitude: 25.212185223887573,
});
