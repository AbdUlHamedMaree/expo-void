import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

import { AccountStackNavigator } from './navigator';

import { tripsFiltersAtom } from '$atoms/trips-filters';
import { MainProfileAccountMainScreen } from '$screens/main/profile/account/main';
import { MainProfileAccountMyTripsScreen } from '$screens/main/profile/account/my-trips';
import { TripsFiltersScreen } from '$screens/main/trips/filters';
import { SingleTripsScreen } from '$screens/main/trips/single';

export const MainProfileAccountStackNavigation: React.FC = () => {
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  return (
    <AccountStackNavigator.Navigator initialRouteName='AccountMain'>
      <AccountStackNavigator.Screen
        name='AccountMain'
        component={MainProfileAccountMainScreen}
        options={{ headerShown: false }}
      />
      <AccountStackNavigator.Screen
        name='MyTrips'
        component={MainProfileAccountMyTripsScreen}
        options={{
          headerShown: true,
          headerTitle: 'My Trips',
          headerRight: () => (
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
          ),
        }}
      />
      <AccountStackNavigator.Screen
        name='SingleTrip'
        component={SingleTripsScreen}
        options={{ headerShown: false }}
        getId={({ params }) => params.id + ''}
      />
      <AccountStackNavigator.Screen
        name='TripsFilters'
        component={TripsFiltersScreen}
        options={{ headerShown: true }}
      />
    </AccountStackNavigator.Navigator>
  );
};
