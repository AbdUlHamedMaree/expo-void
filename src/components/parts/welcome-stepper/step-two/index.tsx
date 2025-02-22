import LottieView from 'lottie-react-native';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';

import { commonStyles } from '$styles/common';

export type WelcomeStepperStepTwoProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepTwo: React.FC<WelcomeStepperStepTwoProps> = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <LottieView
        source={require('$assets/animations/car.json')}
        autoPlay
        loop
        style={{ height: width, width: '100%' }}
      />
      <Text variant='headlineSmall'>Pick people while going to your destination</Text>
      <Text variant='bodyLarge'>and take money from them!</Text>
    </View>
  );
};
