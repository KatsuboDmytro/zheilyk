import Cookies from 'js-cookie';

const key = 'refreshToken';

function get() {
  return Cookies.get(key);
}

function save(token) {
  return Cookies.set(key, token, { expires: 1 });
}

function remove() {
  return Cookies.remove(key);
}

export const refreshTokenService = { get, save, remove };
