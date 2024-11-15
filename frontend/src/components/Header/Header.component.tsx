import React, { useEffect, useState } from 'react'
import { Navigation, Search } from '../index'
import './header.scss';
import { Link } from 'react-router-dom';
import { Burger } from './components/Burger/Burger';

export const Header: React.FC = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1199);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1199);
      setIsBurgerOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
