import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.scss';
import { useTranslation } from 'react-i18next';
import { Back } from '../../../components';

export const Main: React.FC = () => {
  const [t] = useTranslation("global");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="main container">
      <h1 className="main__title">{t("main.title")}</h1>
      <div className="main__categories">
        <Link to="/catalog" className="main__category main__category--1">
          <div className="main__category--insideblock">
            <img src="img/main/parties.png" alt="parties" className="main__category--img" />
          </div>
          <p className="main__category--name">{t("main.first")}</p>
        </Link>
        <Link to="/catalog" className="main__category main__category--2">
          <div className="main__category--insideblock">
            <img src="img/main/every_day.png" alt="every_day" className="main__category--img" />
          </div>
          <p className="main__category--name">{t("main.second")}</p>
        </Link>
        <Link to="/catalog" className="main__category main__category--3">
          <div className="main__category--insideblock">
            <img src="img/main/accessories.png" alt="accessories" className="main__category--img" />
          </div>
          <p className="main__category--name">{t("main.third")}</p>
        </Link>
      </div>
      <Link 
        to="/catalog" 
        className="main__button" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="main__button--text">{t("main.button")}</span>
        <img
          src="img/icons/arrow-right.svg"
          alt="arrow-right"
          className="main__button--arrow"
          style={{ right: isHovered ? '10px' : '-50px' }}
        />
      </Link>
    </section>
  );
};
