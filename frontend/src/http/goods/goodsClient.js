import { createClient } from '../index.js';

export const goodsClient = createClient();

goodsClient.interceptors.response.use(
  (res) => res.data, 
  (error) => {
    if (error.response.status !== 401) {
      throw error;
    }

    return Promise.reject(error);
  }
);