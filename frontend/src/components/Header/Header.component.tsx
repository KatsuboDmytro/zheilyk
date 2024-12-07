import React, { useEffect, useState } from 'react'
import { Navigation, Search } from '../index'
import './header.scss';
import { Link } from 'react-router-dom';
import { Burger } from './components/Burger/Burger';
import useWideScreen from '../../app/useWideScreen';

export const Header: React.FC = () => {
  const { isWideScreen, isBurgerOpen, setIsBurgerOpen } = useWideScreen();

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isSticky && 'header--sticky'}`}>
      <div className="header__box container">
        <Link to="/" className="header__link">
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
          isSticky={isSticky}
          isBurgerOpen={isBurgerOpen}
          setIsBurgerOpen={setIsBurgerOpen}
        />
      </div>
    </header>
  )
}
