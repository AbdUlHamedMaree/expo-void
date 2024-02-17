import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

import { TripsStackNavigator } from './navigator';

import { tripsFiltersAtom } from '$atoms/trips-filters';
import { AllTripsScreen } from '$screens/main/trips/all';
import { TripsFiltersScreen } from '$screens/main/trips/filters';
import { ChatSingleTripsMainScreen } from '$screens/main/trips/single/chat';

export const TripsStackNavigation: React.FC = () => {
  const tripsFilters = useAtomValue(tripsFiltersAtom);

  return (
    <TripsStackNavigator.Navigator initialRouteName='All'>
      <TripsStackNavigator.Screen
        name='All'
        component={AllTripsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Trips',
          headerRight: () => (
            <View style={{ position: 'relative' }}>
              <IconButton
                icon='filter-outline'
                onPress={() => router.navigate('/main/trips/filters')}
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
      <TripsStackNavigator.Screen
        name='Single'
        component={ChatSingleTripsMainScreen}
        options={{ headerShown: true, headerTitle: 'Chat' }}
        getId={({ params }) => params.id + ''}
      />
      {/* <TripsStackNavigator.Screen
        name='Single'
        component={SingleTripsScreen}
        options={{ headerShown: false }}
        getId={({ params }) => params.id + ''}
      /> */}
      <TripsStackNavigator.Screen
        name='Filters'
        component={TripsFiltersScreen}
        options={{ headerShown: true }}
      />
    </TripsStackNavigator.Navigator>
  );
};
