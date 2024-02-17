import { Stack, router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

import { tripsFiltersAtom } from '$atoms/trips-filters';

export default function Layout(): React.ReactNode {
  const tripsFilters = useAtomValue(tripsFiltersAtom);
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name='all'
        options={{
          headerShown: true,
          headerTitle: 'Trips',
          headerRight: () => (
            <View style={{ position: 'relative' }}>
              <IconButton
                icon='filter-outline'
                onPress={() => router.navigate('main/trips/filters')}
              />
              <Badge
                visible={!!tripsFilters}
                size={8}
                style={{ position: 'absolute', top: 4, right: 4 }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='single'
        options={{ headerShown: false }}
        getId={({ params }) => (params ? params.id + '' : undefined)}
      />
      <Stack.Screen name='filters' options={{ headerShown: true }} />
    </Stack>
  );
}
