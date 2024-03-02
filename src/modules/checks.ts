export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNull = (value: unknown): value is null => value === null;

export const isNil = (value: unknown): value is null | undefined =>
  isNull(value) || isUndefined(value);

export const isDefined = <T>(value: T): value is Exclude<T, null | undefined> =>
  !isNil(value);
