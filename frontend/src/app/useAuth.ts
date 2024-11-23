import { useState, useEffect } from 'react';
import { accessTokenService } from '../services/access/accessTokenService';
import { refreshTokenService } from '../services/access/refreshTokenService';
import { googleLogout } from '@react-oauth/google';

interface Profile {
  email: string;
  given_name: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessTokenService.get());
  const [profile, setProfile] = useState<Profile | null>(
    () => JSON.parse(localStorage.getItem('profile') || 'null')
  );

  useEffect(() => {
    const updateAuthStatus = () => {
      const storedProfile = localStorage.getItem('profile');
      setProfile(storedProfile ? JSON.parse(storedProfile) : null);
      setIsAuthenticated(!!accessTokenService.get() || !!storedProfile);
    };

    updateAuthStatus();
  }, []);

  const logOut = () => {
    accessTokenService.remove();
    refreshTokenService.remove();
    setIsAuthenticated(false);
    googleLogout();
    localStorage.removeItem('profile');
    setProfile(null);
  };

  return { isAuthenticated, profile, logOut };
};

export default useAuth;
