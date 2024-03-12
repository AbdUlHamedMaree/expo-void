import { useEffect, useLayoutEffect } from 'react';

const emptyArray: any[] = [];

type CB = () => unknown | Promise<void>;

export const usePreMountEffect = (cb: CB, deps: React.DependencyList = emptyArray) => {
  useLayoutEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useMountEffect = (cb: CB, deps: React.DependencyList = emptyArray) => {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useUnmountEffect = (cb: CB, deps: React.DependencyList = emptyArray) => {
  useEffect(() => {
    return () => {
      cb();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
