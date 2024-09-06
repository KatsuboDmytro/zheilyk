import React from 'react';
import { Good } from '../../../../../types/Good';

interface Props {
  good: Good | null;
}

export const Info: React.FC<Props> = ({ good }) => {
  return (
    <div className="details__info">
      <aside className="details__warnings">
        <article className="details__warnings--card">
          <img className='details__warnings--card-img' src="img/icons/card.svg" alt="card" />
          <h3 className="details__warnings--card-title">Оплата товару</h3>
          <p className="details__warnings--card-text">
            Ви можете оплатити товар на сайті або за реквізитами
          </p>
        </article>
        <article className="details__warnings--card">
          <img className='details__warnings--card-img' src="img/icons/award.svg" alt="award" />
          <h3 className="details__warnings--card-title">Гарантія</h3>
          <p className="details__warnings--card-text">
            Обмін /повернення 14 днів. Список товарів що не підлягає поверненню
          </p>
        </article>
        <article className="details__warnings--card">
          <img className='details__warnings--card-img' src="img/details/new-post.png" alt="new-post" />
          <h3 className="details__warnings--card-title">Доставка</h3>
          <p className="details__warnings--card-text">
            Самовивіз з магазину або службами доставки Нова пошта
          </p>
        </article>
      </aside>
      <aside className="details__about">
        <h3 className="details__info--title">About</h3>
        {good?.description.map((desc, index) => (
          <div key={index} className="details__about--block">
            <h4 className="details__about--block-title">{desc.title}</h4>
            <p className="details__about--block-text">{desc.description}</p>
          </div>
        ))}
      </aside>
    </div>
  );
};
