import { useAtomValue } from 'jotai/react';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { colorSchemaAtom } from '$atoms/color-schema';

export const useAppColorSchema = () => {
  const colorSchema = useAtomValue(colorSchemaAtom);
  const deviceColorSchema = useColorScheme();

  return useMemo<'light' | 'dark'>(() => {
    if (colorSchema === 'system') return deviceColorSchema ?? 'light';
    return colorSchema;
  }, [colorSchema, deviceColorSchema]);
};
