import React from 'react'
import { useTranslation } from 'react-i18next';

export const NotFound: React.FC = () => {
  const [t] = useTranslation("global");

  return (
    <div className="empty">
      <img src="img/media/items/page-not-found.svg" alt="page-not-found" />
      <h3 className="empty__title">{t("not_find.title")}</h3>
    </div>
  );
};
