import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface DeliveryMethodProps {
  deliveryMethod: string;
  handleChange: (field: any, value: string) => void;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ deliveryMethod, handleChange }) => {
  const [t] = useTranslation("global");

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
        <span>{t("checkout.post.nova")}</span>
      </button>
      <hr />
      <button
        className={classNames(
          "account__button account__button--post",
          { 'account__button--post-active': deliveryMethod === 'pickup' }
        )}
        onClick={() => handleChange("delivery_info.delivery_method", "pickup")}
      >
        <img src="img/icons/step.svg" alt="step" />
        <span>{t("checkout.post.by_self")}</span>
      </button>
    </div>
  );
};

export default DeliveryMethod;
