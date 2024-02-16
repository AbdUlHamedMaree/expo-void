import { atomWithAsyncStorage } from '$libs/jotai/atom-with-async-storage';

export enum ColorSchemaEnum {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

export type ColorSchemaUnion = keyof typeof ColorSchemaEnum;

export const colorSchemaAtom = atomWithAsyncStorage<ColorSchemaUnion>(
  'color-schema',
  'system'
);
