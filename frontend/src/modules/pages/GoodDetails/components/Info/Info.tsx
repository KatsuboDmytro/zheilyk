import React from 'react';
import { Good } from '../../../../../types/Good';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Props {
  good: Good | null;
}

export const Info: React.FC<Props> = ({ good }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="details__info">
      <aside className="details__warnings">
        <article className="details__warnings--card">
          <img className='details__warnings--card-img' src="img/icons/card.svg" alt="card" />
          <h3 className="details__warnings--card-title">{t("details.about.payment.title")}</h3>
          <p className="details__warnings--card-text">
            {t("details.about.payment.text")}
          </p>
        </article>
        <article className="details__warnings--card">
          <img className='details__warnings--card-img' src="img/icons/award.svg" alt="award" />
          <h3 className="details__warnings--card-title">{t("details.about.guarentee.title")}</h3>
          <p className="details__warnings--card-text">
            {t("details.about.guarentee.text")}
            <Link to="/contacts" className="details__warnings--card-link">
              {t("details.about.guarentee.list")}
            </Link>
          </p>
        </article>
        <article className="details__warnings--card">
          <img className='details__warnings--card-img' src="img/details/new-post.png" alt="new-post" />
          <h3 className="details__warnings--card-title">{t("details.about.delivery.title")}</h3>
          <p className="details__warnings--card-text">
            {t("details.about.delivery.text")}
          </p>
        </article>
      </aside>
      <aside className="details__about">
        <h3 className="details__info--title">{t("details.about.title")}</h3>
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
