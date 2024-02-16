import axios from 'axios';

import { storage } from '$libs/async-storage/storage';

export const request = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_HTTP_PROTOCOL + '//' + process.env.EXPO_PUBLIC_API_HOST,
  timeout: 4_000,
});

request.interceptors.request.use(
  async config => {
    const accessToken = await storage.accessToken.get();
    if (accessToken)
      config.headers.Authorization =
        config.headers.Authorization ?? `Bearer ${accessToken}`;

    return config;
  },
  err => Promise.reject(err)
);
