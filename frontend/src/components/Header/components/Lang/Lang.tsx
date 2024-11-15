import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setLanguage } from '../../../../features/goodsSlice';

interface LangProps {
  setIsChooseLang: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Lang: React.FC<LangProps> = ({ setIsChooseLang }) => {
  const { language } = useAppSelector((state) => state.goods);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const dispatch = useAppDispatch()

  const handleChooseLanguages = (lang?: string) => {
    if (lang) {
      let languageCode: string;
      switch (lang) {
        case 'uk':
          languageCode = 'uk';
          break;
        case 'en':
          languageCode = 'en';
          break;
        case 'ro':
          languageCode = 'ro';
          break;
        default:
          languageCode = 'uk';
      }

      dispatch(setLanguage(languageCode));
      setSelectedLanguage(lang);
    }
    setIsChooseLang((prev) => !prev);
  };

  return (
    <>
      <li
        className="account__item"
        onClick={() => handleChooseLanguages('uk')}
      >
        Українська {selectedLanguage === 'uk' && <img src="img/icons/checked.svg" alt="checked" />}
      </li>
      <li
        className="account__item"
        onClick={() => handleChooseLanguages('en')}
      >
        English {selectedLanguage === 'en' && <img src="img/icons/checked.svg" alt="checked" />}
      </li>
      <li
        className="account__item"
        onClick={() => handleChooseLanguages('ro')}
      >
        Română {selectedLanguage === 'ro' && <img src="img/icons/checked.svg" alt="checked" />}
      </li>
    </>
  );
};
