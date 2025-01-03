import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { NavigationTheme } from 'react-native-paper/lib/typescript/types';

import { darkColors, lightColors } from './colors';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge.all([
  MD3LightTheme,
  LightTheme,
  { colors: lightColors },
]) as AppTheme;
const CombinedDarkTheme = merge.all([
  MD3DarkTheme,
  DarkTheme,
  { colors: darkColors },
]) as AppTheme;

export type AppTheme = MD3Theme & NavigationTheme & { colors: typeof lightColors };

export const getPaperTheme = (dark: boolean): AppTheme =>
  dark ? CombinedDarkTheme : CombinedDefaultTheme;
