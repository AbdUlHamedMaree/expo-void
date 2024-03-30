export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNull = (value: unknown): value is null => value === null;

export const isNil = (value: unknown): value is null | undefined =>
  isNull(value) || isUndefined(value);

export const isDefined = <T>(value: T): value is Exclude<T, null | undefined> =>
  !isNil(value);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isStringFull = (value: unknown): value is string =>
  isString(value) && value.length > 0;

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function';
