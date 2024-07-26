import React from 'react';
import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';

export const App: React.FC = () => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/menu';

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
