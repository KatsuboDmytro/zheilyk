import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Loading } from '../Loading/Loading';

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
    return <Loading />
  }

  return children ? <>{children}</> : <Outlet />;
};