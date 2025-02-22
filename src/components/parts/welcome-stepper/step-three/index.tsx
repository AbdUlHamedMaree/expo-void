import LottieView from 'lottie-react-native';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';

import { commonStyles } from '$styles/common';

export type WelcomeStepperStepThreeProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepThree: React.FC<WelcomeStepperStepThreeProps> = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <LottieView
        source={require('$assets/animations/time-and-money.json')}
        autoPlay
        loop
        style={{ height: width, width: '100%' }}
      />
      <Text variant='headlineSmall'>Save money and time!</Text>
      <Text variant='bodyLarge'>
        by sharing taxis with others or driving them on your way!
      </Text>
    </View>
  );
};
