import { createAsyncStorage } from './create-async-storage';

import type { AvailableLanguagesUnion } from '$models/available-languages';

export const storage = {
  lang: createAsyncStorage<AvailableLanguagesUnion, AvailableLanguagesUnion>(
    'lang',
    'en'
  ),
  accessToken: createAsyncStorage<string>('access-token'),
  refreshToken: createAsyncStorage<string>('refresh-token'),
};
