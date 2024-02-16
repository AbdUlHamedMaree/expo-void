import { atomWithAsyncStorage } from '$libs/jotai/atom-with-async-storage';

export const isWelcomeStepperSkippedAtom = atomWithAsyncStorage<boolean>(
  'is-welcome-stepper-skipped',
  false
);
