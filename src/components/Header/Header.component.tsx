import React from 'react'
import { Navigation, Search } from '../index'
import './header.scss';
import { Link } from 'react-router-dom';

export const Header:React.FC = () => {
  return (
    <header className="header">
      <div className="header__box container">
        <Link to="/">
          <img
            src="img/icons/main-logo.svg"
            alt="Zheilyk Multibrand store"
            className="header__logo"
          />
        </Link>
        <Search />
        <Navigation />
      </div>
    </header>
  )
}
