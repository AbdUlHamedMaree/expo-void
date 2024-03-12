import { Stack } from 'expo-router';
import React from 'react';

export default function Layout(): React.ReactNode {
  return (
    <Stack>
      <Stack.Screen name='chat' options={{ headerTitle: 'Chat' }} />
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
