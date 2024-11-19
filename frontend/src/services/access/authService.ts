import { authClient } from "../../http/auth/authClient";
import { accessTokenService } from "./accessTokenService";
import { refreshTokenService } from "./refreshTokenService";

interface AuthService {
  register: (language: string, email: string, password: string) => Promise<any>;
  login: (language: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  activate: (language: string, activationToken: string) => Promise<any>;
  refresh: (language: string, token: string) => Promise<any>;
  account: (language: string, access: string) => Promise<any>;
  reset: (language: string, email?: string) => Promise<any>;
  confirm: (language: string, new_password: string, confirm_password: string, token: string) => Promise<any>;
}

const authService: AuthService = {
  register: (language, email, password) => {
    return authClient.post(`${language}/api/v1/users/register/`, { email, password })
  },
  login: async (language, email, password) => {
    const response = await authClient.post(`${language}/api/v1/users/token/`, { email, password });
      const { access, refresh } = response.data || response;
      
      refreshTokenService.save(refresh);
      accessTokenService.save(access);

      return { access, refresh };
  },
  reset: (language, email) => {
    return authClient.post(`${language}/api/v1/users/reset_password/`, { email })
  },
  confirm: (language, new_password, confirm_password, token) => {
    return authClient.post(`${language}/api/v1/users/password_reset_confirm/?token=${token}`, {
      new_password, confirm_password
    })
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