import { Stack, router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

import { tripsFiltersAtom } from '$atoms/trips-filters';

export default function Layout(): React.ReactNode {
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='main'
    >
      <Stack.Screen name='main' options={{ headerShown: false }} />
      <Stack.Screen
        name='my-trips'
        options={{
          headerShown: true,
          headerTitle: 'My Trips',
          headerRight: () => (
            <View style={{ position: 'relative' }}>
              <IconButton
                icon='filter-outline'
                onPress={() => router.navigate('main/profile/account/trips-filters')}
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
        name='single-trip'
        options={{ headerShown: false }}
        getId={({ params }) => (params ? params.id + '' : undefined)}
      />
      <Stack.Screen name='trips-filters' options={{ headerShown: true }} />
    </Stack>
  );
}
