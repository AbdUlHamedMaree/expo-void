import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

export const useRefreshOnFocus = <T>(refetch: () => Promise<T>) => {
  const firstTimeRef = useRef(true);

  const refetchIfRequired = useCallback(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }

    refetch();
  }, [refetch]);

  useFocusEffect(refetchIfRequired);
};
