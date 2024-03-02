import { createContext, useContext } from 'react';

import { isUndefined } from '$modules/checks';

type Selector<T, V> = (state: T) => V;

export const createReactContext = <T,>(initialValue?: T) => {
  const store = createStore(initialValue);

  const Context = createContext(store);

  const useCurrentContext = <V,>(selector: Selector<T, V>): V => {
    const store = useContext(Context);

    if (isUndefined(value)) {
      throw new Error("[void] using context outside of it's provider");
    }

    return selector(value);
  };

  return [useCurrentContext, Context.Provider] as const;
};

const useSelector = <T, V>(
  store: any,
  selector: Selector<T, V>,
  compareFn = Object.is
) => {};

const createStore = <T,>(initialValue?: T) => {
  const store = {
    _listeners: new Set<(state: T) => void>(),
    initialValue,
    value: undefined as undefined | T,
    dispatch: (cb: (state: T) => T) => {
      const newValue = cb(store.value!);
      store.value = newValue;
      store._listeners.forEach(cb => cb(newValue));
    },
    subscribe: (cb: (state: T) => void) => {
      store._listeners.add(cb);

      return () => store._listeners.delete(cb);
    },
    clear: (cb: (state: T) => void) => store._listeners.delete(cb),
    clearAll: () => store._listeners.clear(),
    has: (cb: (state: T) => void) => store._listeners.has(cb),
  };

  return store;
};
