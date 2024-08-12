import React from 'react'
import './card.scss';
import { Good } from '../../../../../types/Good';
import { Link } from 'react-router-dom';

interface Props {
  good: Good;
}

export const Card: React.FC<Props> = ({ good }) => {
  return (
    <article className="good">
      <Link to={`/good/${good.id}`}>
        <div className="good__container">
          <img
            className="good__img"
            src="img/main/every_day.png"
            alt={good.name}
          />
        </div>
        <p className="good__name">{good.name}</p>
        <p className="good__price">{good.price}</p>
      </Link>
    </article>
  );
};
