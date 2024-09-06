import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './checkout.scss';
import './scroll.scss';

export const Checkout: React.FC = () => {
  const user = {
    "id": 0,
    "email": "user@example.com",
    "first_name": "Dmytro",
    "last_name": "Katsubo",
    "is_staff": true,
    "is_email_verified": true,
    "phone_number": "+380123456789",
    "delivery_address": {
      "region": "Ukraine",
      "city": "Kyiv",
      "address": "Some street",
      "department": "Some department", //відділення НП
      "coutry_code": "ua",
    },
    "orders": [
      {
        brand: "THE FISHERMAN",
        color: "Green",
        id: 5,
        images: "/media/items/None.jpg",
        name: "Baseball Cap",
        price: "156.00",
        order_time: 1723718510089,
        amount: 1,
        size: "M",
      },
      {
        brand: "Oh Daddy",
        color: "Green",
        id: 4,
        images: "/media/items/None.jpg",
        name: "Football Cap",
        price: "112.00",
        order_time: 1723718926326,
        amount: 2,
        size: "M",
      }
    ]
  };
  const cart: any[] = [{
    brand: "THE FISHERMAN",
    color: "Green",
    id: 5,
    images: "/media/items/None.jpg",
    name: "Baseball Cap",
    price: "156.00",
    order_time: 1723718510089,
    amount: 1,
    size: "M",
  },
  {
    brand: "THE FISHERMAN",
    color: "Green",
    id: 5,
    images: "/media/items/None.jpg",
    name: "Baseball Cap",
    price: "156.00",
    order_time: 1723718510089,
    amount: 1,
    size: "M",
  },
  {
    brand: "Oh Daddy",
    color: "Green",
    id: 4,
    images: ["/media/items/None.jpg"],
    name: "Football Cap",
    price: "112.00",
    order_time: 1723718926326,
    amount: 2,
    size: "M",
  }];

  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
  const [ordersHistory, setOrdersHistory] = useState(false);
  const [paymentByDetails, setPaymentByDetails] = useState(false);
  const [paymentByCard, setPaymentByCard] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('New Post');

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegExp = new RegExp(/^\d{10}$/);
    return phoneRegExp.test(phoneNumber);
  }

  const handleChangePhoneNumber = (
    value: string,
  ) => {
    const input = value;
    setPhoneNumber(input);
    setValidPhoneNumber(validatePhoneNumber(input));
  }

  const handleShowOrders = () => {
    setOrdersHistory(!ordersHistory);
  }

  return (
    <section className="checkout container">
      <aside className="checkout__info">
        <h1 className="checkout__title">Оформлення замовлення</h1>
        <h3 className="checkout__subtitle">Контактна інформація</h3>
        <form action="put" className="checkout__form">
          <div className="checkout__cell">
            <label htmlFor="name1">Ім'я та Прізвище</label>
            <input
              type="text"
              name="name1"
              id="name1"
              value={`${user?.first_name} ${user?.last_name}`}
            />
          </div>
          <div className="checkout__cell">
            <label htmlFor="phone">Телефон</label>
            <PhoneInput
              country={'ua'}
              specialLabel='Телефон'
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
              inputProps={{
                required: true,
              }}
            />
            {!validPhoneNumber && <span className='checkout__error'>Невірний формат телефону</span>}
          </div>
          <div className="checkout__cell">
            <label htmlFor="email1">Електронна адреса</label>
            <input type="email" name="email1" id="email1" value={user?.email} />
          </div>
        </form>
        
        <h1 className="checkout__subtitle account__title--np">Дані доставки</h1>
        <div className="checkout__row">
          <button
            className={classNames(
              "account__button account__button--post",
              { 'account__button--post-active': deliveryMethod === 'New Post' }
            )}
            onClick={() => setDeliveryMethod('New Post')}
          >
            <img src="img/details/new-post.png" alt="new-post" />
            <span>Нова Пошта</span>
          </button>
          <hr />
          <button
            className={classNames(
              "account__button account__button--post",
              { 'account__button--post-active': deliveryMethod === 'By self' }
            )}
            onClick={() => setDeliveryMethod('By self')}
          >
            <img src="img/icons/step.svg" alt="step" />
            <span>Самовивіз</span>
          </button>
        </div>
        {deliveryMethod === 'New Post' ? (
          <form action="put" className="checkout__form">
            <div className="account__cell">
              <label htmlFor="region">Регіон</label>
              <input type="text" name="region" id="region" value={user?.delivery_address.region} />
            </div>
            <div className="account__cell">
              <label htmlFor="city">Місто</label>
              <input type="text" name="city" id="city" value={user?.delivery_address.city} />
            </div>
            <div className="account__cell">
              <label htmlFor="address">Адреса</label>
              <input type="text" name="address" id="address" value={user?.delivery_address.address} />
            </div>
          </form>
        ) : (
          <div className="account__pickup checkout__form">
            <article className="account__pickup--card">
              <img src="img/icons/geo.svg" alt="geo" />
              <div className="account__pickup--card-data">
                <h3>Адреси магазинів</h3>
                <p>м.Рівне, Фабрична, 12</p>
              </div>
            </article>
            <article className="account__pickup--card">
              <img src="img/icons/clock.svg" alt="clock" />
              <div className="account__pickup--card-data">
                <h3>Графік роботи магазину</h3>
                <p>09:00 - 19:00</p>
              </div>
            </article>
          </div>
        )}
        <h1 className="checkout__subtitle account__title--np">Вид оплати</h1>
        <section className="filter__check checkout__check--1">
          <label className="filter__section--title">Оплата за реквізитами</label>
          <input
            type="checkbox"
            checked={paymentByDetails}
            onChange={() => setPaymentByDetails(prev => !prev)}
          />
        </section>
        <section className="filter__check checkout__check--2">
          <label className="filter__section--title">Онлайн оплата</label>
          <input
            type="checkbox"
            checked={paymentByCard}
            onChange={() => setPaymentByCard(prev => !prev)}
          />
        </section>
        <h3 className="checkout__subtitle">Ваш коментар</h3>
        <form action="put" className="checkout__form">
          <div className="checkout__cell">
            <textarea
              name="comment"
              id="comment"
              className="checkout__comment"
              placeholder="Зв'яжіться зі мною, будь ласка"
            />
          </div>
        </form>
      </aside>
      <aside className="checkout__goods">
        <div className="checkout__titles">
          <h3 className="checkout__title">Ваше замовлення</h3>
          <h4 className="checkout__subtitle">5 товарів</h4>
        </div>
        <div className="checkout__goods--list">
          <div className="scroll-zone" id="style-4">
            {cart.map(item => (
              <article className="account__order--card account__order--cart">
                <img
                  src={`img${item.images}`}
                  alt={item.name}
                  className="account__order--card-img"
                />
                <div className="account__order--card-data">
                  <div>
                    <h3 className='account__order--card-title'>{item.name}</h3>
                    <p>Бренд: {item.brand}</p>
                    <p>Колір: {item.color}</p>
                    <p>Розмір: {item.size}</p>
                  </div>
                  <div className='account__order--right'>
                    <div>
                      <p className='account__order--card-text'>Ціна: {item.price} грн</p>
                      <p className='account__order--card-text'>Кількість: {5}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="checkout__total">
          <h3>Загальна сума: {user.orders.reduce((acc, order) => acc + Number(order.price) * order.amount, 0)} грн</h3>
        </div>
        <div className="checkout__buttons">
          <Link to="/cart" className="checkout__edit">Редагувати</Link>
          <button className="account__button checkout__button">Підтвердити замовлення</button>
        </div>
      </aside>
    </section>
  );
};
