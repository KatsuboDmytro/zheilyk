import React from 'react';
import './App.scss';
import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';

export const App: React.FC = () => {
  const location = useLocation();
  const hideNavigation =
    location.pathname === '/menu' ||
    location.pathname === '/log-in' ||
    location.pathname === '/reset' ||
    matchPath('/confirm/:token', location.pathname) ||
    location.pathname === '/sign-up';

  return (
    <>
      {!hideNavigation && <Header />}
      <div className="section">
        <Outlet />
      </div>
      {!hideNavigation && <Footer />}
    </>
  );
};
