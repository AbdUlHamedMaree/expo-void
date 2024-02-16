import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native';

import { usePaperTheme } from '$theme/hook';

export type AppNavigationContainerProps = NavigationContainerProps;

export const AppNavigationContainer: React.FC<AppNavigationContainerProps> = props => {
  const theme = usePaperTheme();

  return <NavigationContainer theme={theme} {...props} />;
};
