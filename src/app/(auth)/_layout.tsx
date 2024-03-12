import { Stack } from 'expo-router';
import React from 'react';

export default function Layout(): React.ReactNode {
  return <Stack screenOptions={{ headerShown: false }} />;
}
