import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import { View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

import { tripsFiltersAtom } from '$atoms/trips-filters';

export type TripsFiltersIconButtonProps = object;

export const TripsFiltersIconButton: React.FC<TripsFiltersIconButtonProps> = () => {
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  return (
    <View style={{ position: 'relative' }}>
      <IconButton
        icon='filter-outline'
        onPress={() => router.push('/(trips)/trips-filters')}
      />
      <Badge
        visible={!!tripsFilters}
        size={8}
        style={{ position: 'absolute', top: 4, right: 4 }}
      />
    </View>
  );
};
