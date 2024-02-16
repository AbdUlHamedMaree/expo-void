import { SetStateAction } from 'jotai/vanilla';
import { Dispatch, useState } from 'react';

import {
  createAsyncStorage,
  type CreateAsyncStorageResult,
} from './create-async-storage';
import { useStorageState } from './use-storage-state';

export type UseAsyncStorageStateResult<T, F = T> = {
  value: F;
  set: Dispatch<SetStateAction<F>>;
  storage: CreateAsyncStorageResult<T>;
  initialStorageValue: T | undefined;
  setting: boolean;
  loading: boolean;
};

export function useAsyncStorageState<T>(
  key: string
): UseAsyncStorageStateResult<T, T | undefined>;

export function useAsyncStorageState<T>(
  key: string,
  initialState: T
): UseAsyncStorageStateResult<T>;

export function useAsyncStorageState<T>(key: string, initialState?: T) {
  const [storage] = useState(() => createAsyncStorage<T>(key));

  return useStorageState<T>(storage, initialState as T);
}
