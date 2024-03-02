import { Stack } from 'expo-router';
import React from 'react';

import { useMeQuery } from '$apis/user';
import { LoadingSection } from '$components/dumb/loading-section';

export default function Layout(): React.ReactNode {
  const { data, loading } = useMeQuery();

  if (loading) return <LoadingSection loading />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={data ? 'account' : 'login'}
    >
      <Stack.Screen name='login' />
      <Stack.Screen name='sign-up' />
      <Stack.Screen name='account' />
      <Stack.Screen name='otp' />
    </Stack>
  );
}
