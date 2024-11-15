import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import { LanguageButton } from './components/LanguageButton';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__box container">
        <div className="footer__info">
          <div className='footer__info--block'>
            <Link to="/" className='footer__info--logo'>
              <img
                src="img/icons/main-logo.svg"
                alt="Zheilyk Multibrand store"
                className="header__logo"
              />
            </Link>
            <a
              href="https://www.linkedin.com/in/dmytro-katsubo/"
              className="footer__info--author"
            >
              Розроблений та підтримується командою №88
            </a>
          </div>
          {/* <LanguageButton /> */}
          <a
            href="https://www.instagram.com/multibrand_zheilyk?igsh=MzRoOTJrM3VybjFk"
            className="footer__social"
          >
            <img
              src="img/icons/instagram.svg"
              alt="instagram icon"
              className="footer__socials--icon"
            />
            <span>Instagram</span>
          </a>
          <ul className="footer__useful">
            <li className="footer__useful--item">
              <Link to="/about" className="footer__useful--link">
                Контакти
              </Link>
            </li>
            <li className="footer__useful--item">
              <Link to="/contacts" className="footer__useful--link">
                Обмін і повернення
              </Link>
            </li>
            <li className="footer__useful--item">
              <Link to="/delivery" className="footer__useful--link">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
