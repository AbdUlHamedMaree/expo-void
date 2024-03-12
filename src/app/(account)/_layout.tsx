import { Stack } from 'expo-router';
import React from 'react';

import { TripsFiltersIconButton } from '$components/smart/trips-filters-icon-button';

export default function Layout(): React.ReactNode {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='my-trips'
        options={{
          headerShown: true,
          headerTitle: 'My Trips',
          headerRight: TripsFiltersIconButton,
        }}
      />
    </Stack>
  );
}
