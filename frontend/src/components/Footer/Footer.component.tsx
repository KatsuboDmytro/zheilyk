import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const [t, i18n] = useTranslation("global");

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
              {t("footer.devs")}
            </a>
          </div>
          <a
            href="https://www.instagram.com/multibrand_zheilyk?igsh=MzRoOTJrM3VybjFk"
            className="footer__social"
          >
            <img
              src="img/icons/instagram.svg"
              alt="instagram icon"
              className="footer__socials--icon"
            />
            <span>{t("footer.insta")}</span>
          </a>
          <ul className="footer__useful">
            <li className="footer__useful--item">
              <Link to="/contacts" className="footer__useful--link">
                {t("footer.contacts")}
              </Link>
            </li>
            <li className="footer__useful--item">
              <Link to="/delivery" className="footer__useful--link">
                {t("footer.change")}
              </Link>
            </li>
            <li className="footer__useful--item">
              <Link to="/faqs" className="footer__useful--link">
                {t("footer.qa")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
