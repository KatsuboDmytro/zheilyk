import React from 'react';
import './success-order.scss';

export const SuccessOrder: React.FC = () => {
  return (
    <section className="success-order">
      <div className="success-order__content">
        <h1 className="success-order__title">Дякуємо за замовлення!</h1>
        <img 
          className="success-order__image" 
          src="img/logOrSign/success.png" 
          alt="Success"
        />
        <p className="success-order__message">
          Ваше замовлення успішно оформлено. Деталі замовлення ви можете переглянути у своєму email.
        </p>
        <button 
          className="success-order__button"
          onClick={() => window.location.href = '/'}
        >
          Повернутися на головну
        </button>
      </div>
    </section>
  );
};
