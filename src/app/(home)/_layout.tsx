import { Tabs } from 'expo-router';
import React from 'react';

import { MaterialNavigationTabBar } from '$components/dumb/material-navigation-tab-bar';
import { TripsFiltersIconButton } from '$components/smart/trips-filters-icon-button';
import { getNavigationIcon } from '$libs/react-native-paper/get-navigation-icon';

export default function Layout(): React.ReactNode {
  return (
    <Tabs
      tabBar={MaterialNavigationTabBar}
      initialRouteName='map'
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name='map'
        options={{
          tabBarIcon: getNavigationIcon('home'),
          title: 'Map',
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          title: 'Trips',
          tabBarIcon: getNavigationIcon('transit-detour'),
          headerShown: true,
          headerTitle: 'Trips',
          headerRight: TripsFiltersIconButton,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: getNavigationIcon('account'),
        }}
      />
    </Tabs>
  );
}
