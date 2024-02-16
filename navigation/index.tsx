import { useAtomValue } from 'jotai/react';
import React from 'react';

import { MainTabsNavigation } from './main';
import { RootStackNavigator } from './navigator';

import { isWelcomeStepperSkippedAtom } from '$atoms/is-welcome-stepper-skipped';
import { CreateNewTripScreen } from '$screens/create-new-trip';
import { WelcomeStepperScreen } from '$screens/welcome-stepper';

export const RootStack: React.FC = () => {
  const isWelcomeStepperSkipped = useAtomValue(isWelcomeStepperSkippedAtom);

  return (
    <RootStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isWelcomeStepperSkipped ? 'Main' : 'WelcomeStepper'}
    >
      <RootStackNavigator.Screen name='WelcomeStepper' component={WelcomeStepperScreen} />
      <RootStackNavigator.Screen name='Main' component={MainTabsNavigation} />
      <RootStackNavigator.Screen name='CreateNewTrip' component={CreateNewTripScreen} />
    </RootStackNavigator.Navigator>
  );
};
