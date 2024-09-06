import Cookies from 'js-cookie';

const key = 'accessToken';

function get() {
  return Cookies.get(key);
}

function save(token) {
  return Cookies.set(key, token, { expires: 1 });
}

function remove() {
  return Cookies.remove(key);
}

export const accessTokenService = { get, save, remove };
