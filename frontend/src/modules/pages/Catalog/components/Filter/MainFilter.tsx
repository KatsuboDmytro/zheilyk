import React from 'react'
import './filter.scss';
import { BRAND, COLORS, SIZES } from '../../../../../vars';
import classNames from 'classnames';

interface Props {
  choosedSizes: string[];
  setChoosedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  choosedColors: string[];
  setChoosedColors: React.Dispatch<React.SetStateAction<string[]>>;
  choosedBrands: string[];
  setChoosedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  isSale: boolean;
  setIsSale: React.Dispatch<React.SetStateAction<boolean>>;
  isAvailable: boolean;
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainFilter: React.FC<Props> = ({
  choosedSizes,
  setChoosedSizes,
  choosedColors,
  setChoosedColors,
  choosedBrands,
  setChoosedBrands,
  isSale,
  setIsSale,
  isAvailable,
  setIsAvailable
}) => {

  const addOrDelete = (
    arr: string[],
    callback: React.Dispatch<React.SetStateAction<string[]>>,
    currentItem: string
  ) => {
    if (arr.includes(currentItem)) {
      callback(prev => prev.filter(item => item !== currentItem));
    } else {
      callback(prev => [...prev, currentItem]);
    }
  };

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
                className={classNames(
                  "filter__section--item",
                  {"filter__section--item--active": choosedSizes.includes(size)}
                )}
                onClick={() => addOrDelete(choosedSizes, setChoosedSizes, size)}
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
          {COLORS.map(color => {
            return (
              <li
                key={color}
                className={classNames(
                  "filter__section--item",
                  {"filter__section--item--active": choosedColors.includes(color)}
                )}
                onClick={() => addOrDelete(choosedColors, setChoosedColors, color)}
              >
                {color}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="filter__section">
        <h4 className="filter__section--title">Бренд</h4>
        <ul className="filter__section--list">
          {BRAND.map(brand => {
            return (
              <li
                key={brand}
                className={classNames(
                  "filter__section--item",
                  {"filter__section--item--active": choosedBrands.includes(brand)}
                )}
                onClick={() => addOrDelete(choosedBrands, setChoosedBrands, brand)}
              >
                {brand}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="filter__check">
        <h4 className="filter__section--title">Знижка</h4>
        <input
          type="checkbox"
          checked={isSale}
          onChange={() => setIsSale(prev => !prev)}
        />
      </section>
      <section className="filter__check">
        <h4 className="filter__section--title">В наявності</h4>
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={() => setIsAvailable(prev => !prev)}
        />
      </section>
    </aside>
  );
};
