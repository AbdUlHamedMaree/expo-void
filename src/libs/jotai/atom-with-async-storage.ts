import { atomWithStorage } from 'jotai/utils';
import { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

import { appAsyncStorage } from '$libs/async-storage/app-async-storage';

const jsonAsyncStorage: AsyncStorage<any> = {
  getItem: async (key, fallbackValue) => appAsyncStorage.get(key, fallbackValue),
  setItem: async (key, newValue) => {
    appAsyncStorage.set(key, newValue);
  },
  removeItem: async key => {
    appAsyncStorage.delete(key);
  },
};

export const atomWithAsyncStorage = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(key, initialValue, jsonAsyncStorage, { getOnInit: true });
