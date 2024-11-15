import React from 'react';

interface PaymentMethodProps {
  payment: string;
  handleChange: (field: any, value: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ payment, handleChange }) => {
  return (
    <>
      <h1 className="checkout__subtitle account__title--np">Вид оплати</h1>
      <section className="filter__check checkout__check--1">
        <label className="filter__section--title">Оплата наложеним платежем</label>
        <input
          type="checkbox"
          checked={payment === 'cash_on_delivery'}
          onChange={() => handleChange("payment_type", payment === 'cash_on_delivery' ? 'card' : 'cash_on_delivery')}
        />
      </section>
      <section className="filter__check checkout__check--2">
        <label className="filter__section--title">Онлайн оплата</label>
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
