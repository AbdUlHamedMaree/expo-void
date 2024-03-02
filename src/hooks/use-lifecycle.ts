import { useEffect, useLayoutEffect } from 'react';

const emptyArray: any[] = [];

type CB = () => unknown | Promise<void>;

export const useOnPreMount = (cb: CB, deps: React.DependencyList = emptyArray) => {
  useLayoutEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useOnMount = (cb: CB, deps: React.DependencyList = emptyArray) => {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const useOnUnmount = (cb: CB, deps: React.DependencyList = emptyArray) => {
  useEffect(() => {
    return () => {
      cb();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
