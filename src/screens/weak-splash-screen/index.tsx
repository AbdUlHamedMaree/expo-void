import { Text, View } from 'react-native';

import { commonStyles } from '$styles/common';

export type WeakSplashScreenProps = {
  //
};

export const WeakSplashScreen: React.FC<WeakSplashScreenProps> = () => {
  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <Text>Loading...</Text>
    </View>
  );
};
