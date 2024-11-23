import React from 'react';
import { Link } from 'react-router-dom';
import { Basket } from '../../../../types/Cart';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

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
  const [t] = useTranslation("global");

  const totalItems = cart.reduce((acc, order) => acc + order.quantity, 0);
  const totalPrice = cart.reduce((acc, order) => acc + order.price * order.quantity, 0);

  return (
    <aside className="checkout__goods">
      <div className="checkout__titles">
        <h3 className="checkout__title">{t("checkout.order.title")}</h3>
        <h4 className="checkout__subtitle-sub">{totalItems} {t("checkout.order.sub")}</h4>
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
                <div className="account__order--card-data account__order--card-order">
                  <div className='account__order--right-box'>
                    <h3 className='account__order--card-title'>{good.item}</h3>
                    <p>{t("checkout.order.color")}: {good.color}</p>
                    <p>{t("checkout.order.size")}: {good.size}</p>
                  </div>
                  <div className='account__order--right'>
                    <div>
                      <p className='account__order--card-text'>{t("checkout.order.price")}: {good.price * good.quantity} {t("checkout.order.uah")}</p>
                      <p className='account__order--card-text'>{t("checkout.order.quantity")}: {good.quantity}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="checkout__total">
        <p className="checkout__total-text">{t("checkout.order.total")}:&nbsp;</p>
        <p className="checkout__total-text">{totalPrice} {t("checkout.order.uah")}</p>
      </div>
      <div className="checkout__buttons">
        <Link to="/cart" className="checkout__edit">{t("checkout.order.edit")}</Link>
        <button
          style={{
            backgroundColor: error.length > 0 ? "red" : '#222529',
            borderColor: error.length > 0 ? "red" : '#222529'
          }}
          className={classNames(
            "account__button checkout__button",
            {"details__buy--buttons-disabled": !formValid()},
          )}
          disabled={!formValid() || isLoading}
          onClick={handleCheckout}
        >
          {t("checkout.order.create_order")}
        </button>
        {error.length > 0 && <p className="checkout__error">{error}</p>}
      </div>
    </aside>
  );
};

export default OrderSummary;
