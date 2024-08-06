import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';
export const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}
          >
            Головна
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/catalog"
            className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}
          >
            Каталог
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/cart"
            className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}
          >
            Кошик
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/account"
            className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}
          >
            Акаунт
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
