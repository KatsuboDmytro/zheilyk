import React from 'react';
import { useTranslation } from 'react-i18next';

interface PaymentMethodProps {
  payment: string;
  handleChange: (field: any, value: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ payment, handleChange }) => {
  const [t] = useTranslation("global");

  return (
    <>
      <h1 className="checkout__subtitle account__title--np">{t("checkout.payment.title")}</h1>
      <section className="filter__check checkout__check--1">
        <label className="filter__section--title">{t("checkout.payment.cash")}</label>
        <input
          type="checkbox"
          checked={payment === 'cash_on_delivery'}
          onChange={() => handleChange("payment_type", payment === 'cash_on_delivery' ? 'card' : 'cash_on_delivery')}
        />
      </section>
      <section className="filter__check checkout__check--2">
        <label className="filter__section--title">{t("checkout.payment.card")}</label>
        <input
          type="checkbox"
          checked={payment === 'card'}
          onChange={() => handleChange("payment_type", payment === 'card' ? 'cash_on_delivery' : 'card')}
        />
      </section>
    </>
  );
};

export default PaymentMethod;
