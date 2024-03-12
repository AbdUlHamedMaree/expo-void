import { Tabs } from 'expo-router';
import React from 'react';

import { TripsFiltersIconButton } from '$components/smart/trips-filters-icon-button';
import { getNavigationIcon } from '$libs/react-native-paper/get-navigation-icon';

export default function Layout(): React.ReactNode {
  return (
    <Tabs initialRouteName='map' screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='map'
        options={{
          tabBarIcon: getNavigationIcon('home'),
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          tabBarIcon: getNavigationIcon('transit-detour'),
          headerShown: true,
          headerTitle: 'Trips',
          headerRight: TripsFiltersIconButton,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: getNavigationIcon('account'),
        }}
      />
    </Tabs>
  );
}
