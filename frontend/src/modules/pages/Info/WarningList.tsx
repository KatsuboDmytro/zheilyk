import React from 'react'
import { Back } from '../../../components';
import './info.scss';
import { useTranslation } from 'react-i18next';

export const WarningList: React.FC = () => {
  const [t] = useTranslation("global");

  return (
    <div className='main container'>
      <Back />
      <h1 className="main__title list-title">{t("warning.title")}</h1>
      <p className='list-paragraph'>
        <b>{t("warning.important")}</b> {t("warning.description")}
      </p>
    </div>
  );
};
