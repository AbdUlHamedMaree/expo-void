import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WelcomeStepperBottomNavigationButtons } from '$components/parts/welcome-stepper/bottom-navigation-buttons';
import { WelcomeStepperStepOne } from '$components/parts/welcome-stepper/step-one';
import { WelcomeStepperStepThree } from '$components/parts/welcome-stepper/step-three';
import { WelcomeStepperStepTwo } from '$components/parts/welcome-stepper/step-two';
import { commonStyles } from '$styles/common';

export default function Screen(): React.ReactNode {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => setStepIndex(v => Math.min(v + 1, 2));

  const prevStep = () => setStepIndex(v => Math.max(v - 1, 0));

  const handleFinishOrSkip = () => router.replace('/main/home');

  return (
    <SafeAreaView style={[commonStyles.flexFull, commonStyles.screenPadding]}>
      {steps[stepIndex]}
      <WelcomeStepperBottomNavigationButtons
        hidePrevButton={stepIndex === 0}
        hideNextButton={stepIndex === 2}
        showFinishButton={stepIndex === 2}
        hideSkipButton={stepIndex === 2}
        onPrev={prevStep}
        onNext={nextStep}
        onSkip={handleFinishOrSkip}
        onFinish={handleFinishOrSkip}
      />
    </SafeAreaView>
  );
}

const steps = [
  <WelcomeStepperStepOne key='1' />,
  <WelcomeStepperStepTwo key='2' />,
  <WelcomeStepperStepThree key='3' />,
];
