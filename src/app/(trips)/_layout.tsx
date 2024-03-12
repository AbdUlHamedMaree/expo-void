import { Stack } from 'expo-router';
import React from 'react';

export default function Layout(): React.ReactNode {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='create-new-trip' />
      <Stack.Screen name='single-trip/[trip-id]' />
      <Stack.Screen
        name='trips-filters'
        options={{ headerShown: true, headerTitle: 'Trips Filters' }}
      />
    </Stack>
  );
}
