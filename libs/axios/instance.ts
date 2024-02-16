import axios from 'axios';

import { storage } from '$libs/async-storage/storage';
// import { API_HTTP_PROTOCOL, API_HOST } from '@env';

const API_HTTP_PROTOCOL = '',
  API_HOST = '';

export const request = axios.create({
  baseURL: API_HTTP_PROTOCOL + '//' + API_HOST,
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
