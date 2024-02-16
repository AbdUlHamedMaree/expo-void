import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetStateAction } from 'jotai/vanilla';
import { Dispatch, useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { isNil } from '$modules/checks';

export function useAsyncStorageState<T>(key: string): {
  value: T | undefined;
  set: Dispatch<SetStateAction<T | undefined>>;
  initialStorageValue: T | undefined;
  setting: boolean;
  loading: boolean;
};

export function useAsyncStorageState<T>(
  key: string,
  initialState: T
): {
  value: T;
  set: Dispatch<SetStateAction<T>>;
  initialStorageValue: T | undefined;
  setting: boolean;
  loading: boolean;
};

export function useAsyncStorageState<T>(key: string, initialState?: T) {
  const [state, setState] = useState({
    setting: false,
    loading: true,
    storageValue: undefined as T | undefined,
  });

  const [value, setValue] = useState(initialState);

  const setValueWithStorage = useCallback<typeof setValue>(
    valueOrSetter => {
      if (typeof valueOrSetter === 'function') {
        const setter = valueOrSetter as (value: T | undefined) => T | undefined;
        setValue(oldVal => {
          const newVal = setter(oldVal);
          setState(state => ({ ...state, setting: true }));
          (async () => {
            try {
              if (isNil(newVal)) {
                await AsyncStorage.removeItem(key);
              } else {
                const stringifiedValue = JSON.stringify(newVal);
                await AsyncStorage.setItem(key, stringifiedValue);
              }
              setState(state => ({ ...state, setting: false }));
            } catch (err) {
              console.error(err);
              setState(state => ({ ...state, setting: false }));
            }
          })();
          return newVal;
        });
      }

      const value = valueOrSetter;

      setState(state => ({ ...state, setting: true }));

      (async () => {
        try {
          if (isNil(value)) {
            await AsyncStorage.removeItem(key);
          } else {
            const stringifiedValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, stringifiedValue);
          }
          setState(state => ({ ...state, setting: false }));
        } catch (err) {
          console.error(err);
          setState(state => ({ ...state, setting: false }));
        }
      })();

      setValue(value);
    },
    [key]
  );

  useLayoutEffect(() => {
    setState(state => ({ ...state, loading: true }));

    (async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (!value) return;

        const parsedValue = JSON.parse(value) as T;

        setState(state => ({ ...state, storageValue: parsedValue, loading: false }));
      } catch (err) {
        console.log(err);
        setState(state => ({ ...state, loading: false }));
      }
    })();
  }, [key]);

  return useMemo(
    () => ({
      value,
      set: setValueWithStorage,
      initialStorageValue: state.storageValue,
      setting: state.setting,
      loading: state.loading,
    }),
    [value, setValueWithStorage, state.loading, state.setting, state.storageValue]
  );
}
