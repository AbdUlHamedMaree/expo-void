import AsyncStorage from '@react-native-async-storage/async-storage';

import { isNil } from '$modules/checks';

export type CreateAsyncStorage<T, F = null> = (
  key: string,
  baseFallbackValue: F
) => {
  set: (value: T | F) => Promise<boolean>;
  get: <L = F>(fallbackValue?: L) => Promise<T | L>;
  delete: () => Promise<boolean>;
};

export const createAsyncStorage = <T, F = null>(
  key: string,
  baseFallbackValue: F = null as F
) => ({
  set: async (value: T | F) => {
    try {
      if (isNil(value)) {
        await AsyncStorage.removeItem(key);
        return true;
      }

      const stringifiedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringifiedValue);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  get: async <L = F>(fallbackValue: L = null as L) => {
    try {
      const stringifiedValue = await AsyncStorage.getItem(key);
      if (isNil(stringifiedValue)) return undefined;
      const value = JSON.parse(stringifiedValue) as T;

      return value ?? fallbackValue ?? baseFallbackValue;
    } catch (err) {
      console.error(err);

      return undefined;
    }
  },
  delete: async () => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
});
