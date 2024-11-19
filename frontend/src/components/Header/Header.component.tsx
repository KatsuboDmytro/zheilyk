import React, { useEffect, useState } from 'react'
import { Navigation, Search } from '../index'
import './header.scss';
import { Link } from 'react-router-dom';
import { Burger } from './components/Burger/Burger';
import useWideScreen from '../../app/useWideScreen';

export const Header: React.FC = () => {
  const { isWideScreen, isBurgerOpen, setIsBurgerOpen } = useWideScreen();

  return (
    <header className="header">
      <div className="header__box container">
        <Link to="/">
          <img
            src="./img/icons/main-logo.svg"
            alt="Zheilyk Multibrand store"
            className="header__logo"
          />
        </Link>
        {isWideScreen &&
          <Search
            isBurgerOpen={isBurgerOpen}
            setIsBurgerOpen={setIsBurgerOpen}
          />}
        <Navigation
          isWideScreen={isWideScreen}
          setIsBurgerOpen={setIsBurgerOpen}
        />
        <Burger
          isBurgerOpen={isBurgerOpen}
          setIsBurgerOpen={setIsBurgerOpen}
        />
      </div>
    </header>
  )
}
