import { useMemo } from 'react';
import { DeepPartial } from 'react-hook-form';
import { useTheme } from 'react-native-paper';

import { AppTheme, getPaperTheme } from './theme';

import { useAppColorSchema } from '$hooks/use-app-color-schema';

export const usePaperTheme = () => {
  const colorSchema = useAppColorSchema();

  return useMemo(() => getPaperTheme(colorSchema === 'dark'), [colorSchema]);
};

export const useAppTheme = (overrides?: DeepPartial<AppTheme>) =>
  useTheme<AppTheme>(overrides);
