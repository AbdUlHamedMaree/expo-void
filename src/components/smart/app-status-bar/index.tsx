import { StatusBar, StatusBarProps } from 'expo-status-bar';

import { usePaperTheme } from '$theme/hook';

export type AppStatusBarProps = StatusBarProps;

export const AppStatusBar: React.FC<AppStatusBarProps> = props => {
  const theme = usePaperTheme();

  return <StatusBar style='auto' backgroundColor={theme.colors.background} {...props} />;
};
