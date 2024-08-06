import { authClient } from '../http/authClient.js';

function register({ email, password }) {
  return authClient.post(`/api/v1/users/register/`, { email, password })
}

function login({ email, password }) {
  return authClient.post('/api/v1/users/token/', { email, password })
}

function logout() {
  return authClient.post('/log-out')
}

function activate(activationToken) {
  return authClient.get(`/api/v1/users/verifying/?token=${activationToken}`);
}

function refresh(token) {
  return authClient.post('/api/v1/users/refresh/', { refresh: token });
}

function account(access) {
  return authClient.get('/api/v1/users/me', {
    headers: { Authorization: `Bearer ${access}` }
  });
}

export const authService = { register, login, logout, activate, refresh, account };
