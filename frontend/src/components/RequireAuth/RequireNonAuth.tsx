import { Navigate, Outlet } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks.js';
import { Loading } from '../Loading/Loading.js';

interface Props {
  children?: ReactNode;
}

export const RequireNonAuth = ({ children }: Props): ReactElement | null => {
  const { isChecked, user } = useAppSelector(state => state.auth);

  if (!isChecked) {
    return <Loading />
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};