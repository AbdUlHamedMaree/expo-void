import { Stack } from 'expo-router';

import { StackScreenBackButtonHeaderLeft } from '$components/smart/stack-screen-back-button-header-left';

export const stackScreenWithBetterBackButton = <TProps extends JSX.IntrinsicAttributes>(
  Screen: React.ComponentType<TProps>
): React.FC<TProps> => {
  const NewScreen = (props: TProps) => (
    <>
      <Stack.Screen
        options={{
          headerLeft: StackScreenBackButtonHeaderLeft,
        }}
      />
      <Screen {...props} />
    </>
  );

  return NewScreen;
};
