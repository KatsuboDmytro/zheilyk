import React from 'react'
import './card.scss';
import { Good } from '../../../../../types/Good';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NonAvailable } from '../NonAvailable/NonAvailable';

interface Props {
  good: Good;
}

const IMAGESS = [
  'https://i.postimg.cc/L4jV3Nd9/image.png',
  'https://i.postimg.cc/66MRZJZn/11.png',
  'https://i.postimg.cc/B6qL8MQm/12.png',
  'https://i.postimg.cc/TPchXgqg/13.jpg',
  'https://i.postimg.cc/1ttRhTz1/14.jpg',
]
export const Card: React.FC<Props> = ({ good }) => {
  const [t] = useTranslation('global')

  return (
    <article className="good">
      <Link to={`/good/${good.id}`}>
        <div className="good__container">
          {good.sale && <div className="good__sale">{t("cart.sale")}</div>}
          <img
            className="good__img"
            // src={`${process.env.REACT_APP_API_URL}${good.images[0]}`}
            src={`${IMAGESS[1]}`}
            alt={good.name}
          />
        </div>
        <p className="good__name">{good.name}</p>
        <p className={`good__price ${good.sale && 'good__price--sale'}`}>{good.price}</p>
        <p className="good__price">{good?.sale_price}</p>
      </Link>
      {!good.in_stock && <NonAvailable />}
    </article>
  );
};
