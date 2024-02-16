import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Suspense } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { RootStack } from '$navigation';
import { AppPaperProvider } from '$theme/provider';
import { AppStatusBar } from '$components/smart/app-status-bar';
import { AppNavigationContainer } from '$components/smart/app-navigation-container';
import { commonStyles } from '$styles/common';
import { WeakSplashScreen } from '$screens/weak-splash-screen';
import { SplashScreen as AppSplashScreen } from '$screens/splash-screen';
// import Geocoder from 'react-native-geocoding';
// import { GOOGLE_SERVICES_API } from '@env';
import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '$libs/react-query/client';
import { useRefetchOnAppFocus } from '$libs/react-query/use-refetch-on-app-focus';
import { useAxiosService } from '$libs/axios/hooks';
import { AppErrorBoundary } from '$components/dumb/app-error-boundary';

import { useColorScheme } from '$components_/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

import 'react-native-gesture-handler';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

function RootLayoutNav() {
  useRefetchOnAppFocus();
  useAxiosService();
  const colorScheme = 'dark';
  // const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Suspense fallback={<WeakSplashScreen />}>
        <AppErrorBoundary>
          <GestureHandlerRootView style={commonStyles.flexFull}>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <AppPaperProvider>
                  <AppErrorBoundary>
                    <AppStatusBar />
                    <AppNavigationContainer>
                      <Suspense fallback={<AppSplashScreen />}>
                        <PaperToastContainer variant='contained' />
                        <Stack>
                          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                          <Stack.Screen
                            name='modal'
                            options={{ presentation: 'modal' }}
                          />
                        </Stack>
                      </Suspense>
                    </AppNavigationContainer>
                  </AppErrorBoundary>
                </AppPaperProvider>
              </SafeAreaProvider>
            </QueryClientProvider>
          </GestureHandlerRootView>
        </AppErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}
