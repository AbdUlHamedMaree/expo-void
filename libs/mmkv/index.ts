import { createStorage } from './create-storage';

import { AvailableLanguagesUnion } from '$models/available-languages';

export const storage = {
  lang: createStorage<AvailableLanguagesUnion, AvailableLanguagesUnion>('lang', 'en'),
  accessToken: createStorage<string>('access-token'),
  refreshToken: createStorage<string>('refresh-token'),
};
