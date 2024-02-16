import { useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

import { hideRootTabsAtom } from '$atoms/hide-root-tabs';

export const useShowRootTabs = () => {
  const setHideRootTabs = useSetAtom(hideRootTabsAtom);

  useLayoutEffect(() => {
    setHideRootTabs(false);
  }, []);
};
