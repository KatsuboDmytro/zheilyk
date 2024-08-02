import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import './logIn.scss';

export const LogIn: React.FC = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <section className='log'>
      <aside className="log__welcome">
        <div className="log__back" onClick={handleGoBack}>
          <img src="img/icons/arrow-left.svg" alt="arrow-left" />&nbsp;
          <span>Назад</span>
        </div>
        <div className="log__center">
          <div className="log__hello">
            <h1 className="log__title">Раді бачити знову!</h1>
            <p className="log__description">
            Ще не маєш акаунт?&nbsp;
              <Link to="/sign-up" className="log__action">Зареєструватись</Link>
            </p>
          </div>
          <form action="submit" className="log__form">
            <div className="log__mail">
              <label htmlFor="email" className="log__label">Email</label>
              <input
                type="email"
                id="email"
                className="log__input"
                placeholder='example@gmail.com'
              />
            </div>
            <div className="log__mail">
              <label htmlFor="password" className="log__label">Пароль</label>
              <div className="log__password">
                <input
                  type={type}
                  id="password"
                  className="log__input"
                  placeholder='Твій пароль'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="log__input--eye" onClick={handleToggle}>
                  <Icon icon={icon} size={25}/>
                </span>
              </div>
            </div>
            <a className="log__forget">Забули пароль?</a>
            <button className="log__button" type="submit">
              Зайти
            </button>
          </form>
        </div>
        <div className="log__or">
          <div className="log__or--line"></div>
          <span className="log__or--text">або</span>
          <div className="log__or--line"></div>
        </div>
      </aside>
      <aside className="log__img">
        <img src="img/logOrSign/logIn-photo.png" alt="logOrSign" />
      </aside>
    </section>
  )
}
