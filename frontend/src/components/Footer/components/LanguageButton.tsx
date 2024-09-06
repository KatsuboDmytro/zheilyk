import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setLanguage } from '../../../features/goodsSlice';
import classNames from 'classnames';

const languages = ['Українська', 'English', 'Română'];

export const LanguageButton: React.FC = () => {
  const { language } = useAppSelector((state) => state.goods);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language);

  const handleChangeLanguage = (language: string) => {
    switch (language) {
      case 'Українська': {
        dispatch(setLanguage('uk'));
        break;
      }
      case 'English': {
        dispatch(setLanguage('en'));
        break;
      }
    }
    setIsDropdownOpen(false);

    window.location.reload();
  }

  return (
    <aside className="footer__filter--sort-by">
      <div className="footer__dropdown-trigger">
        <button
          type="button"
          className="footer__dropdown-button"
          aria-haspopup="true"
          aria-controls="footer__dropdown-button"
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
              <a
                key={index}
                className={classNames('footer__dropdown-item', {
                  'is-active': selectedLang === lang,
                })}
                onClick={() => handleChangeLanguage(lang)}
              >
                {lang}
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
