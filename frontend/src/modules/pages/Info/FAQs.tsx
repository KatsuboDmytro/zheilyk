import React from 'react'
import { Back } from '../../../components';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const FAQs: React.FC = () => {
  const [t] = useTranslation("global");
  const location = useLocation();

  return (
    <div className='main container'>
      <Back />
      <h1 className="main__title list-title">{t("faq.title")}</h1>
      <h4 className='contacts__title'>{t("faq.first.title")}</h4>
      <p className='list-paragraph'>
        {t("faq.first.description")}
        <br />{t("faq.first.next")}
      </p>
      <h4 className='contacts__title'>{t("faq.second.title")}</h4>
      <p className='list-paragraph'>
        {t("faq.second.description.1")}
        <br /><br /> {t("faq.second.description.2")}
        <br /><br /> {t("faq.second.description.3")}
        <br /><br /> {t("faq.second.description.4")}
        <br /><br /> {t("faq.second.description.5")}
        <br /><br /> <b>{t("warning.important")}</b> {t("faq.second.description.6")}
      </p>
      <h4 className='contacts__title'>{t("faq.third.title")}</h4>
      <p className='list-paragraph'>
        {t("faq.third.description.1")}
        <br /><br /> {t("faq.third.description.2")}
      </p>
      <h4 className='contacts__title'>{t("faq.fourth.title")}</h4>
      <p className='list-paragraph'>
        {t("faq.fourth.description.1")}
        <br /> {t("faq.fourth.description.3")}
        <br /> {t("faq.fourth.description.2")}
        «<a href="https://novapost.com/uk-pl/tracking/" rel="noreferrer" target='_blank'>{t("faq.fourth.description.link")}</a>»
      </p>
      <h4 className='contacts__title'>{t("faq.fifth.title")}</h4>
      <p className='list-paragraph'>
        {t("faq.fifth.description.1")}&nbsp;
        <Link
          to="/modal"
          className='list-paragraph--link'
          state={{ previousLocation: location }}
        >
          {t("faq.fifth.description.link")}
        </Link>
      </p>
    </div>
  );
};
