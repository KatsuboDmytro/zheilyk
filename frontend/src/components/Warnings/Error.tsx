import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface EmptyProps {
  isCart?: boolean;
}

export const Error: React.FC<EmptyProps> = ({ isCart }) => {
  const [t] = useTranslation("global");

  return (
    <div className="empty">
      <img src="img/media/items/opps.svg" alt="oops" />
      <h3 className="empty__title">{t("warnings.some_error")}</h3>
      <p className="empty__text">
        {isCart ? (
          <>
            {t("warnings.need_to.firstly")}{" "}
            <Link to="/log-in" className="checkout__warning--link">
              {t("warnings.need_to.login")}
            </Link>{" "}
            {"<(^~^)>"}
          </>
        ) : (
          t("warnings.need_to.message")
        )}
      </p>
    </div>
  );
};
