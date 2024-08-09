import { Navigate, Outlet } from 'react-router-dom';
import { useContext, ReactElement, ReactNode } from 'react';
import { Loader } from './Loader.jsx';
import { useAppSelector } from '../../app/hooks.js';

interface Props {
  children?: ReactNode;
}

export const RequireNonAuth = ({ children }: Props): ReactElement | null => {
  const { isChecked, user } = useAppSelector(state => state.auth);

  if (!isChecked) {
    return <Loader />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};