import { useState, useEffect } from 'react';
import { accessTokenService } from '../services/access/accessTokenService';
import { refreshTokenService } from '../services/access/refreshTokenService';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessTokenService.get());

  useEffect(() => {
    const updateAuthStatus = () => {
      setIsAuthenticated(!!accessTokenService.get());
    };

    updateAuthStatus();
  }, []);

  const logOut = () => {
    accessTokenService.remove();
    refreshTokenService.remove();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logOut };
};

export default useAuth;
