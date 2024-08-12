import React from 'react'
import './filter.scss';
import { BRAND, COLORS, SIZES } from '../../../../../vars';

export const MainFilter:React.FC = () => {
  return (
    <aside className="filter">
      <div className="filter__title">
        <img
          src="img/icons/filter.svg"
          className="filter__title--img"
          alt="filter"
        />
        <h3 className="filter__title--text">Фільтри</h3>
      </div>
      <section className="filter__section">
        <h4 className="filter__section--title">Розмір</h4>
        <ul className="filter__section--list">
          {SIZES.map(size => {
            return (
              <li
                key={size}
                className="filter__section--item"
              >
                {size}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="filter__section">
        <h4 className="filter__section--title">Колір</h4>
        <ul className="filter__section--list">
          {COLORS.map(size => {
            return (
              <li
                key={size}
                className="filter__section--item"
              >
                {size}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="filter__section">
        <h4 className="filter__section--title">Бренд</h4>
        <ul className="filter__section--list">
          {BRAND.map(size => {
            return (
              <li
                key={size}
                className="filter__section--item filter__section--item--active"
              >
                {size}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="filter__check">
        <h4 className="filter__section--title">Знижка</h4>
        <input
          type="checkbox"
        />
      </section>
      <section className="filter__check">
        <h4 className="filter__section--title">В наявності</h4>
        <input
          type="checkbox"
        />
      </section>
    </aside>
  );
};
