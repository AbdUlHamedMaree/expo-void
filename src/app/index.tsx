import { Redirect } from 'expo-router';
import { useAtomValue } from 'jotai';

import { isWelcomeStepperSkippedAtom } from '$atoms/is-welcome-stepper-skipped';

export default function Screen(): React.ReactNode {
  const isWelcomeStepperSkipped = useAtomValue(isWelcomeStepperSkippedAtom);

  if (isWelcomeStepperSkipped) return <Redirect href='/main/home' />;

  return <Redirect href='/welcome-stepper' />;
}
