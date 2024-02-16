import AsyncStorage from '@react-native-async-storage/async-storage';

import { isNil, isUndefined } from '$modules/checks';

export const appAsyncStorage = {
  set: async (key: string, value: any) => {
    try {
      if (isUndefined(value)) {
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
  get: async <T, F = undefined>(key: string, fallbackValue: F = undefined as F) => {
    try {
      const stringifiedValue = await AsyncStorage.getItem(key);
      if (isNil(stringifiedValue)) return fallbackValue;
      const value = JSON.parse(stringifiedValue) as T;

      if (isUndefined(value)) return fallbackValue;

      return value;
    } catch (err) {
      console.error(err);

      return fallbackValue;
    }
  },
  delete: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};
