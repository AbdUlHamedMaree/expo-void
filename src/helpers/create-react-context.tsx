import { createContext, useContext, type Context } from 'react';

import { isUndefined } from '$modules/checks';

export const createReactContext = <T,>(initialValue?: T) => {
  const Context = createContext(initialValue);

  const useCurrentContext = () => {
    const context = useContext(Context);
    if (isUndefined(context)) {
      throw new Error("[void] using context outside of it's provider");
    }

    return context;
  };

  return [useCurrentContext, (Context as Context<T>).Provider] as const;
};
