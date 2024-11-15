import React from 'react';
import classNames from 'classnames';

interface DeliveryMethodProps {
  deliveryMethod: string;
  handleChange: (field: any, value: string) => void;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ deliveryMethod, handleChange }) => {
  return (
    <div className="checkout__row">
      <button
        className={classNames(
          "account__button account__button--post",
          { 'account__button--post-active': deliveryMethod === 'New Post' }
        )}
        onClick={() => handleChange("delivery_info.delivery_method", "New Post")}
      >
        <img src="img/details/new-post.png" alt="new-post" />
        <span>Нова Пошта</span>
      </button>
      <hr />
      <button
        className={classNames(
          "account__button account__button--post",
          { 'account__button--post-active': deliveryMethod === 'Самовивіз' }
        )}
        onClick={() => handleChange("delivery_info.delivery_method", "Самовивіз")}
      >
        <img src="img/icons/step.svg" alt="step" />
        <span>Самовивіз</span>
      </button>
    </div>
  );
};

export default DeliveryMethod;
