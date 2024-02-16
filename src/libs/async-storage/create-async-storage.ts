import { appAsyncStorage } from './app-async-storage';

import { isUndefined } from '$modules/checks';

export type CreateAsyncStorage<T, F = undefined> = (
  key: string,
  baseFallbackValue?: F
) => CreateAsyncStorageResult<T, F>;

export type CreateAsyncStorageResult<T, F = undefined> = {
  set: (value?: T | F | undefined) => Promise<boolean>;
  get: <L = undefined>(fallbackValue?: L) => Promise<T | F | L>;
  delete: () => Promise<boolean>;
  key: string;
  fallbackValue: F;
};

export const createAsyncStorage = <T, F = undefined>(
  key: string,
  baseFallbackValue: F = undefined as F
): CreateAsyncStorageResult<T, F> => ({
  key,
  fallbackValue: baseFallbackValue,
  set: async value => appAsyncStorage.set(key, value),
  get: async (fallbackValue = undefined) => {
    const value = await appAsyncStorage.get<T, typeof fallbackValue>(key, fallbackValue);

    if (isUndefined(value)) return baseFallbackValue;

    return value;
  },
  delete: async () => appAsyncStorage.delete(key),
});
