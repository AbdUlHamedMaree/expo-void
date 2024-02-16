import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

// import { RootStack } from '$navigation';
import { AppErrorBoundary } from '$components/dumb/app-error-boundary';
import { AppStatusBar } from '$components/smart/app-status-bar';
import { useAxiosService } from '$libs/axios/hooks';
import { queryClient } from '$libs/react-query/client';
import { useRefetchOnAppFocus } from '$libs/react-query/use-refetch-on-app-focus';
import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { SplashScreen as AppSplashScreen } from '$screens/splash-screen';
import { WeakSplashScreen } from '$screens/weak-splash-screen';
import { commonStyles } from '$styles/common';
// import Geocoder from 'react-native-geocoding';
// import { GOOGLE_SERVICES_API } from '@env';
import { usePaperTheme } from '$theme/hook';
import { AppPaperProvider } from '$theme/provider';

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

const Application: React.FC = () => {
  useRefetchOnAppFocus();
  useAxiosService();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppPaperProvider>
        <AppErrorBoundary>
          <AppStatusBar />
          <Suspense fallback={<AppSplashScreen />}>
            <PaperToastContainer variant='contained' />
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
            </Stack>
          </Suspense>
        </AppErrorBoundary>
      </AppPaperProvider>
    </SafeAreaProvider>
  );
};

function RootLayoutNav() {
  const theme = usePaperTheme();

  return (
    <ThemeProvider value={theme}>
      <Suspense fallback={<WeakSplashScreen />}>
        <AppErrorBoundary>
          <GestureHandlerRootView style={commonStyles.flexFull}>
            <QueryClientProvider client={queryClient}>
              <Application />
            </QueryClientProvider>
          </GestureHandlerRootView>
        </AppErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
}
