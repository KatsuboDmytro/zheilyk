import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import useAuth from '../../../../app/useAuth';
import './burger.scss';
import { Search } from '../Search/Search';
import { Lang } from '../Lang/Lang';
import { useTranslation } from 'react-i18next';

interface BurgerProps {
  isBurgerOpen: boolean;
  setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Burger: React.FC<BurgerProps> = ({ isBurgerOpen, setIsBurgerOpen }) => {
  const [t] = useTranslation("global");
  const { cart } = useAppSelector((state) => state.cart);
  const [isChooseLang, setIsChooseLang] = useState(false);
  const { isAuthenticated, logOut } = useAuth();
  const navigate = useNavigate()
  const burgerRef = useRef<HTMLDivElement>(null);
  
  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  useEffect(() => {
    if (isBurgerOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.classList.add('no-scroll');
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = '';
    };
  }, [isBurgerOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerRef.current && !burgerRef.current.contains(event.target as Node)
      ) {
        setIsBurgerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section
      className='burger'
      ref={burgerRef}
      style={{ right: isBurgerOpen ? '0' : '-150%' }}
    >
      <div className="burger__nav">
        <img
          src="img/icons/close-burger.svg"
          alt="burger"
          onClick={() => setIsBurgerOpen(false)}
        />
      </div>
      <ul className="burger__list">
        <li className="burger__item">
          <Search
            isBurgerOpen={isBurgerOpen}
            setIsBurgerOpen={setIsBurgerOpen}
          />
        </li>
        <li className="burger__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'burger__link burger__link--active' : 'burger__link'
            }
          >
            {t("header.main")}
          </NavLink>
        </li>
        <li className="burger__item">
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? 'burger__link burger__link--active' : 'burger__link'
            }
          >
            {t("header.catalog")}
          </NavLink>
        </li>
        <li className="burger__item">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'burger__link burger__link--active' : 'burger__link'
            }
          >
            {t("header.cart")}
          </NavLink>
          {cart.length > 0 && (
            <div className="nav__item--cart nav__item--cart">
              <span className="nav__item--cart-length burger__item--cart-length">{cart.length}</span>
            </div>
          )}
        </li>
        <li className="burger__item">
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive ? 'burger__link burger__link--active' : 'burger__link'
            }
          >
            {t("header.checkout")}
          </NavLink>
        </li>
        {!isAuthenticated && (
          <li className="burger__item">
            <NavLink
              to="/log-in"
              className={({ isActive }) =>
                isActive ? 'burger__link burger__link--active' : 'burger__link'
              }
            >
              {t("header.login")}
            </NavLink>
          </li>
        )}
        <li
          className="burger__item"
          onClick={() => setIsChooseLang((prev) => !prev)}
        >
          {t("header.language")}
          <img src="img/icons/language_icon.svg" alt="language" />
        </li>
        <li className="burger__item burger__item--padd">
          {isChooseLang && <Lang setIsChooseLang={setIsChooseLang} />}
        </li>

        {isAuthenticated && (
          <li
            className="burger__item"
            onClick={handleLogOut}
          >
            {t("header.logout")}
            <img src="img/icons/signout.svg" alt="signout" />
          </li>
        )}
      </ul>
    </section>
  );
};
