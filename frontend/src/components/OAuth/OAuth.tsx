import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessTokenService } from '../../services/access/accessTokenService';

interface User {
  access_token: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export const OAuth: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(
    () => JSON.parse(localStorage.getItem('profile') || 'null')
  );
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const tokens = codeResponse as User;
      setUser(tokens);

      accessTokenService.save(tokens.access_token);
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  useEffect(() => {
    const token = accessTokenService.get();
    if (token) {
      // Якщо є токен у cookies, виконуємо запит до Google API
      axios
        .get('https://www.googleapis.com/oauth2/v1/userinfo', {
          params: { access_token: token },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const userProfile = res.data as Profile;
          setProfile(userProfile);
          localStorage.setItem('profile', JSON.stringify(userProfile));
          navigate('/');
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);

    // Видаляємо токен із cookies
    accessTokenService.remove();
    localStorage.removeItem('profile');
  };

  return (
    <>
      {profile ? (
        <div>
          <h3>Welcome, {profile.name}</h3>
          <button className='log__button' onClick={logOut}>Logout</button>
        </div>
      ) : (
        <button className='log__button' onClick={() => login()}>
          <text><img src="img/icons/google.svg" alt="google" />Google</text>
        </button>
      )}
    </>
  );
};
