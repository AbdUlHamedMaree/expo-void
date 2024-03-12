import type { FetchResult } from '@apollo/client';

export const throwIfGqlErrors = <T>(result: FetchResult<T>): T => {
  if (!result.data && result.errors) {
    throw result.errors;
  }

  return result.data!;
};
