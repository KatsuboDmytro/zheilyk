import React from 'react';
import { Link } from 'react-router-dom';
import { Basket } from '../../../../types/Cart';
import classNames from 'classnames';

interface OrderSummaryProps {
  handleCheckout: () => void;
  cart: Basket[];
  formValid: () => boolean;
  error: string;
  isLoading: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  handleCheckout, cart, formValid, error, isLoading
}) => {
  const totalItems = cart.reduce((acc, order) => acc + order.quantity, 0);
  const totalPrice = cart.reduce((acc, order) => acc + order.price * order.quantity, 0);

  return (
    <aside className="checkout__goods">
      <div className="checkout__titles">
        <h3 className="checkout__title">Ваше замовлення</h3>
        <h4 className="checkout__subtitle-sub">{totalItems} товарів</h4>
      </div>
      <div className="checkout__goods--list">
        {cart.map(item => (
          <React.Fragment key={item.id}>
            {cart.map((good: any) => (
              <article key={good.id} className="account__order--card account__order--cart">
                <img
                  src={'https://i.postimg.cc/L4jV3Nd9/image.png'}
                  // src={`img{item.images}`}
                  alt={good.item}
                  className="account__order--card-img"
                />
                <div className="account__order--card-data">
                  <div className='account__order--right-box'>
                    <h3 className='account__order--card-title'>{good.item}</h3>
                    <p>Колір: {good.color}</p>
                    <p>Розмір: {good.size}</p>
                  </div>
                  <div className='account__order--right'>
                    <div>
                      <p className='account__order--card-text'>Ціна: {good.price * good.quantity} грн</p>
                      <p className='account__order--card-text'>Кількість: {good.quantity}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="checkout__total">
        <p className="checkout__total-text">Загальна сума:&nbsp;</p>
        <p className="checkout__total-text">{totalPrice} грн</p>
      </div>
      <div className="checkout__buttons">
        <Link to="/cart" className="checkout__edit">Редагувати</Link>
        <button
          style={{
            backgroundColor: error.length > 0 ? "red" : '#222529',
            borderColor: error.length > 0 ? "red" : '#222529'
          }}
          className={classNames(
            "account__button checkout__button",
            {"details__buy--buttons-disabled": !formValid()},
          )}
          disabled={!formValid() || !isLoading}
          onClick={handleCheckout}
        >
          Підтвердити замовлення
        </button>
        {error.length > 0 && <p className="checkout__error">{error}</p>}
      </div>
    </aside>
  );
};

export default OrderSummary;
