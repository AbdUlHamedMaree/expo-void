import { SetStateAction } from 'jotai/vanilla';
import { Dispatch, useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { type CreateAsyncStorageResult } from './create-async-storage';

export type UseStorageStateResult<T, F = T> = {
  value: F;
  set: Dispatch<SetStateAction<F>>;
  storage: CreateAsyncStorageResult<T>;
  initialStorageValue: T | undefined;
  setting: boolean;
  loading: boolean;
};

export function useStorageState<T, F = undefined>(
  storage: CreateAsyncStorageResult<T, F>
): UseStorageStateResult<T, T | undefined>;

export function useStorageState<T, F = undefined>(
  storage: CreateAsyncStorageResult<T, F>,
  initialState: T
): UseStorageStateResult<T>;

export function useStorageState<T, F = undefined>(
  storage: CreateAsyncStorageResult<T, F>,
  initialState?: T
) {
  const [state, setState] = useState({
    setting: false,
    loading: true,
    storageValue: undefined as T | F | undefined,
  });

  const [value, setValue] = useState(initialState);

  const set = useCallback<typeof setValue>(
    valueOrSetter => {
      if (typeof valueOrSetter === 'function') {
        const setter = valueOrSetter as (value: T | undefined) => T | undefined;
        setValue(oldVal => {
          const newVal = setter(oldVal);
          setState(state => ({ ...state, setting: true }));
          (async () => {
            await storage.set(newVal);
            setState(state => ({ ...state, setting: false }));
          })();
          return newVal;
        });

        return;
      }

      const value = valueOrSetter;

      setState(state => ({ ...state, setting: true }));

      (async () => {
        await storage.set(value);
        setState(state => ({ ...state, setting: false }));
      })();

      setValue(value);
    },
    [storage]
  );

  useLayoutEffect(() => {
    setState(state => ({ ...state, loading: true }));

    (async () => {
      const value = await storage.get();
      setState(state => ({ ...state, storageValue: value, loading: false }));
    })();
  }, []);

  return useMemo(
    () => ({
      value,
      set,
      storage,
      initialStorageValue: state.storageValue,
      setting: state.setting,
      loading: state.loading,
    }),
    [value, set, storage, state.storageValue, state.setting, state.loading]
  );
}
