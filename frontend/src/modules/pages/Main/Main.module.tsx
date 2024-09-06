import React from 'react'
import './main.scss';
import { Link } from 'react-router-dom';

export const Main: React.FC = () => {
  return (
    <section className="main container">
      <h1 className="main__title">Категорії</h1>
      <div className="main__categories">
        <Link to="/catalog" className="main__category main__category--1">
          <div className="main__category--insideblock">
            <img src="img/main/parties.png" alt="parties" className="main__category--img" />
          </div>
          <p className="main__category--name">Святкові сукні</p>
        </Link>
        <Link to="/catalog" className="main__category main__category--2">
          <div className="main__category--insideblock">
            <img src="img/main/every_day.png" alt="every_day" className="main__category--img" />
          </div>
          <p className="main__category--name">Сукні на кожен день</p>
        </Link>
        <Link to="/catalog" className="main__category main__category--3">
          <div className="main__category--insideblock">
            <img src="img/main/accessories.png" alt="accessories" className="main__category--img" />
          </div>
          <p className="main__category--name">Аксесуари</p>
        </Link>
      </div>
      <Link to="/catalog" className="main__button">
        <span className="main__button--text">Дивитись каталог</span>
        <img
          src="img/icons/arrow-right.svg"
          alt="arrow-right"
          className="main__button--arrow"
        />
      </Link>
    </section>
  );
};
