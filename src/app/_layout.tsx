import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, Suspense } from 'react';
import Geocoder from 'react-native-geocoding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppErrorBoundary } from '$components/dumb/app-error-boundary';
import { AppStatusBar } from '$components/smart/app-status-bar';
import { ApolloClientProvider } from '$libs/apollo-client/provider';
import { queryClient } from '$libs/react-query/client';
import { useRefetchOnAppFocus } from '$libs/react-query/use-refetch-on-app-focus';
import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { SplashScreen as AppSplashScreen } from '$screens/splash-screen';
import { WeakSplashScreen } from '$screens/weak-splash-screen';
import { commonStyles } from '$styles/common';
import { usePaperTheme } from '$theme/hook';
import { AppPaperProvider } from '$theme/provider';

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_SERVICES_API_KEY);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav: React.FC = () => {
  const theme = usePaperTheme();

  return (
    <ThemeProvider value={theme}>
      <Suspense fallback={<WeakSplashScreen />}>
        <AppErrorBoundary>
          <GestureHandlerRootView style={commonStyles.flexFull}>
            <QueryClientProvider client={queryClient}>
              <ApolloClientProvider>
                <Application />
              </ApolloClientProvider>
            </QueryClientProvider>
          </GestureHandlerRootView>
        </AppErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};

const Application: React.FC = () => {
  useRefetchOnAppFocus();

  return (
    <AppPaperProvider>
      <AppStatusBar />
      <Suspense fallback={<AppSplashScreen />}>
        <PaperToastContainer variant='contained' />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Suspense>
    </AppPaperProvider>
  );
};
