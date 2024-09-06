import React, { useState } from 'react'
import { accessTokenService } from '../../../services/access/accessTokenService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setUser } from '../../../features/authSlice';
import { refreshTokenService } from '../../../services/access/refreshTokenService';
import { Link, useNavigate } from 'react-router-dom';
import './account.scss';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const Account: React.FC = () => {
  // const { user } = useAppSelector(state => state.auth);
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
  }
  const [ordersHistory, setOrdersHistory] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('New Post');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [validPhoneNumber, setValidPhoneNumber] = useState(true);
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

  const handleLogOut = () => {
    accessTokenService.remove();
    refreshTokenService.remove();
    dispatch(setUser(null));
    navigate('/');
  };

  const handleShowOrders = () => {
    setOrdersHistory(!ordersHistory);
  }
  
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

  return (
    <section className="account container">
      <div className="account__orders">
        <button
          className="account__order--btn"
          onClick={handleShowOrders}
        >
          <h1 className="account__title">Історія замовлень</h1>
          <img src={`img/icons/chevron (arrow ${ordersHistory ? 'up' : 'down'}).svg`} alt="chevron" />
        </button>
        {ordersHistory && (
          <div className="account__order">
            {user.orders
              .sort((a, b) => b.order_time - a.order_time)
              .map((order, index) => (
              <Link to={`/good/${order.id}`} className="account__order--card">
                <img
                  src={`img${order.images}`}
                  alt={order.name}
                  className="account__order--card-img"
                />
                <div className="account__order--card-data">
                  <div>
                    <h3 className='account__order--card-title'>{order.name}</h3>
                    <p>Бренд: {order.brand}</p>
                    <p>Колір: {order.color}</p>
                    <p>Розмір: {order.size}</p>
                  </div>
                  <div>
                    <p className='account__order--card-text'>Ціна: {order.amount * +order.price} грн</p>
                    <p className='account__order--card-text'>Кількість: {order.amount}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <h1 className="account__title">Персональні дані</h1>
      <form action="put" className="account__form">
        <div className="account__cells">
          <div className="account__cell">
            <label htmlFor="email1">Електронна адреса</label>
            <input type="email" name="email1" id="email1" value={user?.email} />
          </div>
          <div className="account__cell">
            <label htmlFor="name1">Ім'я</label>
            <input type="text" name="name1" id="name1" value={user?.first_name} />
          </div>
          <div className="account__cell">
            <label htmlFor="surname1">Прізвище</label>
            <input type="text" name="surname1" id="surname1" value={user?.last_name} />
          </div>
          <div className="account__cell">
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
            {!validPhoneNumber && <span className='account__error'>Невірний формат телефону</span>}
          </div>
          <div className="account__cell">
            <label htmlFor="city1">Місто</label>
            <input type="text" name="city1" id="city1" value={user?.delivery_address.city} />
          </div>
        </div>
        <div className="account__row">
          <input 
            type="button" 
            name="save" 
            className='account__button account__button--save' 
            value="Зберегти зміни" 
          />
          <input 
            type="button" 
            name="save" 
            className='account__button account__button--cancel' 
            value="Відмінити" 
          />
        </div>
      </form>
      
      <h1 className="account__title account__title--np">Дані доставки</h1>
      <div className="account__row">
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
        <form action="put" className="account__form">
          <div className="account__cells">
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
          </div>
          <div className="account__row">
            <input 
              type="button" 
              name="save" 
              className='account__button account__button--save' 
              value="Зберегти зміни" 
            />
            <input 
              type="button" 
              name="save" 
              className='account__button account__button--cancel' 
              value="Відмінити" 
            />
          </div>
        </form>
      ) : (
        <div className="account__pickup account__form">
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

      <h1 className="account__title">Зміна паролю</h1>
      <form action="put" className="account__form">
        <div className="account__cells">
          <div className="account__cell">
            <label htmlFor="email">Старий пароль</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="account__cell">
            <label htmlFor="password">Новий пароль</label>
            <input type="password" name="password" id="password" value={user?.first_name} />
          </div>
          <div className="account__cell">
            <label htmlFor="password">Повторіть новий пароль</label>
            <input type="password" name="password" id="password" value={user?.last_name} />
          </div>
        </div>
        <div className="account__row">
          <input 
            type="button" 
            name="save" 
            className='account__button account__button--save' 
            value="Зберегти зміни" 
          />
          <input 
            type="button" 
            name="save" 
            className='account__button account__button--cancel' 
            value="Відмінити" 
          />
        </div>
      </form>
      
      <button
        onClick={handleLogOut}
        className="account__button account__button--logout"
      >
        Вийти з аккаунта
      </button>
    </section>
  )
}
