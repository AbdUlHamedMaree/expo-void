import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAtomValue } from 'jotai';
import { useEffect, Suspense } from 'react';
import Geocoder from 'react-native-geocoding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

// import { RootStack } from '$navigation';
import { isWelcomeStepperSkippedAtom } from '$atoms/is-welcome-stepper-skipped';
import { AppErrorBoundary } from '$components/dumb/app-error-boundary';
import { AppStatusBar } from '$components/smart/app-status-bar';
import { useAxiosService } from '$libs/axios/hooks';
import { queryClient } from '$libs/react-query/client';
import { useRefetchOnAppFocus } from '$libs/react-query/use-refetch-on-app-focus';
import { PaperToastContainer } from '$modules/react-native-paper-toast';
import { SplashScreen as AppSplashScreen } from '$screens/splash-screen';
import { WeakSplashScreen } from '$screens/weak-splash-screen';
import { commonStyles } from '$styles/common';
import { usePaperTheme } from '$theme/hook';
import { AppPaperProvider } from '$theme/provider';

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_SERVICES_API);

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
              <SafeAreaView style={commonStyles.flexFull}>
                <Application />
              </SafeAreaView>
            </QueryClientProvider>
          </GestureHandlerRootView>
        </AppErrorBoundary>
      </Suspense>
    </ThemeProvider>
  );
};

const Application: React.FC = () => {
  useRefetchOnAppFocus();
  useAxiosService();

  const isWelcomeStepperSkipped = useAtomValue(isWelcomeStepperSkippedAtom);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppPaperProvider>
        <AppErrorBoundary>
          <AppStatusBar />
          <Suspense fallback={<AppSplashScreen />}>
            <PaperToastContainer variant='contained' />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={isWelcomeStepperSkipped ? 'main' : 'welcome-stepper'}
            />
          </Suspense>
        </AppErrorBoundary>
      </AppPaperProvider>
    </SafeAreaProvider>
  );
};
