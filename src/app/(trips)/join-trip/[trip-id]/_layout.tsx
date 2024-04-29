import { Stack } from 'expo-router';
import React from 'react';

export default function Layout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Join Trip' }} />
    </Stack>
  );
}
