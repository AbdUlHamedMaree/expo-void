import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { Region } from 'react-native-maps';

import { getRegionBoundaries } from '$helpers/location';

export const useGetRegionBoundaries = () => {
  const window = useWindowDimensions();

  return useCallback((region: Region) => getRegionBoundaries(region, window), [window]);
};
