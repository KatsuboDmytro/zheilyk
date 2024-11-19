import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyProps {
  isCart?: boolean;
}

export const Error: React.FC<EmptyProps> = ({ isCart }) => {
  return (
    <div className="empty">
      <img src="img/media/items/opps.svg" alt="oops" />
      <h3 className="empty__title">Сталась якась помилка</h3>
      <p className="empty__text">
        {isCart ? (
          <>
            Вам треба спочатку{" "}
            <Link to="/log-in" className="checkout__warning--link">
              увійти/зареєструватись
            </Link>{" "}
            {"<(^~^)>"}
          </>
        ) : (
          "Спробуйте пізніше або впевніться, що все правильно заповнено"
        )}
      </p>
    </div>
  );
};
