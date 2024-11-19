import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface EmptyProps {
  text: string;
  isCart?: boolean;
}

export const Empty: React.FC<EmptyProps> = ({ text, isCart }) => {
  const [t] = useTranslation("global");

  return (
    <div className="empty">
      <img src="img/media/items/empty-box.svg" alt="empty" />
      <h3 className="empty__title">{text}</h3>
      {isCart && <Link to='/catalog' className='checkout__warning--link'>{t("warnings.choose")}</Link>}
    </div>
  );
};
