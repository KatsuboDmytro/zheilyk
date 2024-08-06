import React from 'react'
import { authService } from '../../../services/authService';
import { accessTokenService } from '../../../services/accessTokenService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setUser } from '../../../features/authSlice';
import { refreshTokenService } from '../../../services/refreshTokenService';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

  const handleLogOut = () => {
    accessTokenService.remove();
    refreshTokenService.remove();
    dispatch(setUser(null));
    navigate('/');
  };

  return (
    <section className="account container">
      <h1 className="title">Account</h1>
      <ul>
        <li>Email: {user?.email}</li>
        <li>first_name: {user?.first_name}</li>
        <li>id: {user?.id}</li>
        <li>is_email_verified: {user?.is_email_verified}</li>
        <li>is_staff: {user?.is_staff}</li>
        <li>last_name: {user?.last_name}</li>
      </ul>
      <button onClick={handleLogOut}>Log out</button>
    </section>
  )
}
