import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: 'https://inst-store-api.onrender.com/',
    withCredentials: true,
  });
}