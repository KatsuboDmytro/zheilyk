import { Navigate, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import { Loader } from './Loader.jsx';
import { useAppSelector } from '../../app/hooks.js';

interface Props {
  children?: React.ReactNode;
}

export const RequireNonAuth:React.FC<Props> = ({ children }) => {
  const { isChecked, user } = useAppSelector(state => state.auth);

  if (!isChecked) {
    return <Loader />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};