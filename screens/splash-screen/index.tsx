import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '$styles/common';

export type SplashScreenProps = {
  //
};

// TODO: make better screen
export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <SafeAreaView style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Text variant='headlineLarge'>Loading...</Text>
    </SafeAreaView>
  );
};
