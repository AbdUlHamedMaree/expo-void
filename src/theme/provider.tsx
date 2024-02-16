import React from 'react';
import { PaperProvider } from 'react-native-paper';

import { usePaperTheme } from './hook';

export const AppPaperProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = usePaperTheme();

  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};
