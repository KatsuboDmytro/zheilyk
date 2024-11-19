import React from 'react';
import './success-order.scss';
import { useTranslation } from 'react-i18next';

export const SuccessOrder: React.FC = () => {
  const [t] = useTranslation("global");

  return (
    <section className="success-order">
      <div className="success-order__content">
        <h1 className="success-order__title">{t("success.title")}</h1>
        <img 
          className="success-order__image" 
          src="img/logOrSign/success.png" 
          alt="Success"
        />
        <p className="success-order__message">
          {t("success.description")}
        </p>
        <button 
          className="success-order__button"
          onClick={() => window.location.href = '/'}
        >
          {t("success.button")}
        </button>
      </div>
    </section>
  );
};
