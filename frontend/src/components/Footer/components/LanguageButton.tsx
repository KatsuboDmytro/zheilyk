import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setLanguage } from '../../../features/goodsSlice';
import classNames from 'classnames';

const languages = ['Українська', 'English', 'Română'];

export const LanguageButton: React.FC = () => {
  const { language } = useAppSelector((state) => state.goods);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language);

  const handleChangeLanguage = (lang: string) => {
    let languageCode: string;
    switch (lang) {
      case 'Українська':
        languageCode = 'uk';
        break;
      case 'English':
        languageCode = 'en';
        break;
      case 'Română':
        languageCode = 'ro';
        break;
      default:
        languageCode = 'uk';
    }

    dispatch(setLanguage(languageCode));
    setSelectedLang(lang);
    setIsDropdownOpen(false);
  }

  return (
    <aside className="footer__filter--sort-by">
      <div className="footer__dropdown-trigger">
        <button
          type="button"
          className="footer__dropdown-button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedLang}</span>
          <img
            src={`img/icons/${isDropdownOpen ? 'chevron (arrow up).svg' : 'chevron (arrow down).svg'}`}
            alt="chevron"
          />
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="footer__dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="footer__dropdown-content">
            {languages.map((lang, index) => (
              <button
                key={index}
                className={classNames('footer__dropdown-item', {
                  'is-active': selectedLang === lang,
                })}
                onClick={() => handleChangeLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
