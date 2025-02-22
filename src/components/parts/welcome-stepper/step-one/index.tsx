import LottieView from 'lottie-react-native';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';

import { commonStyles } from '$styles/common';

export type WelcomeStepperStepOneProps = {
  children?: React.ReactNode;
};

export const WelcomeStepperStepOne: React.FC<WelcomeStepperStepOneProps> = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={[commonStyles.flexFull, commonStyles.flexCenter]}>
      <LottieView
        source={require('$assets/animations/group.json')}
        autoPlay
        loop
        style={{ height: width, width: '100%' }}
      />
      <Text variant='headlineSmall'>Find people going to the same destination</Text>
      <Text variant='bodyLarge'>and share one taxi!</Text>
    </View>
  );
};
