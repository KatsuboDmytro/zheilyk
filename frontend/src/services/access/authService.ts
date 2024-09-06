import { authClient } from "../../http/auth/authClient";

interface AuthService {
  register: (language: string, email: string, password: string) => Promise<any>;
  login: (language: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  activate: (language: string, activationToken: string) => Promise<any>;
  refresh: (language: string, token: string) => Promise<any>;
  account: (language: string, access: string) => Promise<any>;
}

const authService: AuthService = {
  register: (language, email, password) => {
    return authClient.post(`${language}/api/v1/users/register/`, { email, password })
  },
  login: (language, email, password) => {
    return authClient.post(`${language}/api/v1/users/token/`, { email, password })
  },
  logout: () => {
    return authClient.post('/log-out')
  },
  activate: (language, activationToken) => {
    return authClient.get(`${language}/api/v1/users/verifying/?token=${activationToken}`)
  },
  refresh: (language, token) => {
    return authClient.post(`${language}/api/v1/users/refresh/`, { refresh: token })
  },
  account: (language, access) => {
    return authClient.get(`${language}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${access}` },
    })
  },
};

export default authService;