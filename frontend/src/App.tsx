import React, { useEffect } from 'react';
import './App.scss';
import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { useAppSelector } from './app/hooks';
import i18next from 'i18next';
import { global_en, global_ro, global_uk } from './translations';

export const App: React.FC = () => {
  const location = useLocation();
  const language = useAppSelector((state) => state.goods.language);

  useEffect(() => {
    i18next.init({
      interpolation: { escapeValue: false },
      lng: language,
      resources: {
        en: {
          global: global_en,
        },
        ro: {
          global: global_ro,
        },
        uk: {
          global: global_uk,
        },
      },
    });

    i18next.changeLanguage(language);
  }, [language]);

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
