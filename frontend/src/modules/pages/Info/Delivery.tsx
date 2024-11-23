import React from 'react'
import './info.scss';
import { Back } from '../../../components';
import { useTranslation } from 'react-i18next';

export const Delivery: React.FC = () => {
  const [t] = useTranslation("global");

  return (
    <div className='main container'>
      <Back />
      <h1 className="main__title list-title">{t("return.title")}</h1>
      <h4 className='contacts__title'>{t("return.pickup.title")}</h4>
      <p className='list-paragraph'>{t("return.pickup.description")}</p>
      <h4 className='contacts__title'>{t("return.delivery.title")}</h4>
      <p className='list-paragraph'>
        {t("return.delivery.description")} <br /> <br />
        <i>{t("return.delivery.cursive")}</i>
      </p>
      <h4 className='contacts__title'>{t("return.payment.title")}</h4>
      <p className='list-paragraph'>
        <ol>
          <li>{t("return.payment.first")}</li>
          <li>{t("return.payment.second")}</li>
          <li>{t("return.payment.third")}</li>
        </ol>
      </p>
    </div>
  );
};
