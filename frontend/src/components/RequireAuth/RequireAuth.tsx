import { Navigate, Outlet, useLocation } from 'react-router-dom';
import React, { ReactNode, ReactElement } from 'react';
import { Loader } from './Loader';
import { useAppSelector } from '../../app/hooks';

interface Props {
  children?: ReactNode;
}

export const RequireAuth = ({ children }: Props): ReactElement | null => {
  const { isChecked, user } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  if (!isChecked) {
    return <Loader />;
  }

  return children ? <>{children}</> : <Outlet />;
};
