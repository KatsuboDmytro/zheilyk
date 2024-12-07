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

  const login = async () => {
    await axios
      .get('https://inst-store-api.onrender.com/accounts/google/login/')
      .then((res) => {
        const userProfile = res.data as Profile;
        setProfile(userProfile);
        localStorage.setItem('profile', JSON.stringify(userProfile));
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  // useEffect(() => {
  //   const token = accessTokenService.get();
  //   if (token) {
  //     // Якщо є токен у cookies, виконуємо запит до Google API
  //     axios
  //       .get('https://inst-store-api.onrender.com/accounts/google/login/')
  //       .then((res) => {
  //         const userProfile = res.data as Profile;
  //         setProfile(userProfile);
  //         localStorage.setItem('profile', JSON.stringify(userProfile));
  //         navigate('/');
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [user]);

  const logOut = () => {
    // googleLogout();
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
