import { useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

import { hideRootTabsAtom } from '$atoms/hide-root-tabs';

export const useHideRootTabs = () => {
  const setHideRootTabs = useSetAtom(hideRootTabsAtom);

  useLayoutEffect(() => {
    setHideRootTabs(true);

    return () => {
      setHideRootTabs(false);
    };
  }, []);
};
