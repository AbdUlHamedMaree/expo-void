import { Tabs } from 'expo-router';
import React from 'react';

import { getNavigationIcon } from '$libs/react-native-paper/get-navigation-icon';

export default function Layout(): React.ReactNode {
  return (
    <Tabs initialRouteName='home'>
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: getNavigationIcon('home'),
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          tabBarIcon: getNavigationIcon('transit-detour'),
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
