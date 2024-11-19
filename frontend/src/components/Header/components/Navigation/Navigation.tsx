import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import './nav.scss';
import { setLanguage } from '../../../../features/goodsSlice';
import useAuth from '../../../../app/useAuth';
import { Lang } from '../Lang/Lang';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  isWideScreen: boolean;
  setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navigation: React.FC<NavigationProps> = ({ isWideScreen, setIsBurgerOpen }) => {
  const [t] = useTranslation("global");
  const { cart } = useAppSelector((state) => state.cart);
  const [isChooseLang, setIsChooseLang] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const { isAuthenticated, logOut } = useAuth();

  const settingsRef = useRef<HTMLUListElement>(null);
  const languageRef = useRef<HTMLUListElement>(null);

	const navigate = useNavigate()

  const handleSettingsVisibility = () => {
    setIsSettingsVisible((prev) => !prev);
  };

  const handleLogOut = () => {
    logOut();
    setIsSettingsVisible(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current && !settingsRef.current.contains(event.target as Node) &&
        languageRef.current && !languageRef.current.contains(event.target as Node)
      ) {
        setIsSettingsVisible(false);
        setIsChooseLang(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav">
      {isWideScreen &&
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              {t("header.main")}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              {t("header.catalog")}
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              {t("header.cart")}
            </NavLink>
            {cart.length > 0 && (
              <div className="nav__item--cart">
                <span className="nav__item--cart-length">{cart.length}</span>
              </div>
            )}
          </li>
          <li className="nav__item">
            <img 
              src="img/icons/account.svg" 
              alt="account" 
              className="nav__item--img" 
              onClick={handleSettingsVisibility}
            />
            <ul
              className="account"
              style={{ display: isSettingsVisible ? 'block' : 'none' }}
              ref={settingsRef}
            >
              {!isAuthenticated && (<li className="account__item">
                <Link to="/log-in">{t("header.login")}</Link>
              </li>)}
              <li className="account__item">
                <Link to="/checkout">{t("header.checkout")}</Link>
              </li>
              <li
                className="account__item account__item--language"
                onClick={() => setIsChooseLang((prev) => !prev)}
              >
                {t("header.language")}
                <ul
                  className="account language"
                  style={{ display: isChooseLang ? 'block' : 'none' }}
                  ref={languageRef}
                >
                  <Lang setIsChooseLang={setIsChooseLang} />
                </ul>
                <img src="img/icons/language_icon.svg" alt="language" />
              </li>
              {isAuthenticated && (
                <li
                  className="account__item"
                  onClick={handleLogOut}
                >
                  {t("header.logout")}
                  <img src="img/icons/signout.svg" alt="signout" />
                </li>
              )}
            </ul>
          </li>
        </ul>
      }
      {!isWideScreen && <img
        src="img/icons/burger.svg"
        alt="burger"
        className='nav__burger'
        onClick={() => setIsBurgerOpen(true)}
      />}
    </nav>
  );
};
