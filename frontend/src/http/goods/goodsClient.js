import { accessTokenService } from '../../services/access/accessTokenService.js';
import { createClient } from '../index.js';

export const goodsClient = createClient();

const getLanguage = () => {
  const language = localStorage.getItem('language');
  return language?.replace(/['"]/g, '');
};

goodsClient.interceptors.request.use(
  (config) => {
    const accessToken = accessTokenService.get();
    const language = getLanguage();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (language && config.method !== 'post' && config.method !== 'pathch' && config.method !== 'put') {
      config.url = `/${language}${config.url}`;
    } else {
      config.url = `/en${config.url}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

goodsClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status !== 401) {
      throw error;
    }
    return Promise.reject(error);
  }
);
