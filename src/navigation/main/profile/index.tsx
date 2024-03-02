import React from 'react';

import { MainProfileAccountStackNavigation } from './account';
import { ProfileStackNavigator } from './navigator';

import { useMeQuery } from '$apis/user';
import { LoadingSection } from '$components/dumb/loading-section';
import { MainProfileLoginScreen } from '$screens/main/profile/login';
import { MainProfileOTPScreen } from '$screens/main/profile/otp';
import { MainProfileSignUpScreen } from '$screens/main/profile/sign-up';

export const ProfileStackNavigation: React.FC = () => {
  const { data, loading } = useMeQuery();

  if (loading) return <LoadingSection loading />;

  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={data ? 'Account' : 'Login'}
    >
      <ProfileStackNavigator.Screen name='Login' component={MainProfileLoginScreen} />
      <ProfileStackNavigator.Screen name='SignUp' component={MainProfileSignUpScreen} />
      <ProfileStackNavigator.Screen
        name='Account'
        component={MainProfileAccountStackNavigation}
      />
      <ProfileStackNavigator.Screen name='OTP' component={MainProfileOTPScreen} />
    </ProfileStackNavigator.Navigator>
  );
};
