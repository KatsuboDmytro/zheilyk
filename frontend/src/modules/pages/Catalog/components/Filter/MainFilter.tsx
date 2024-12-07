import React from 'react'
import './filter.scss';
import { BRAND, COLORS, SIZES } from '../../../../../vars';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  setIsOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsOpenFilter,
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
  const [t] = useTranslation("global");

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
      <section className="filter__section">
        <h4 className="filter__section--title">{t("catalog.filters.size")}</h4>
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
        <h4 className="filter__section--title">{t("catalog.filters.color")}</h4>
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
        <h4 className="filter__section--title">{t("catalog.filters.brand")}</h4>
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
        <h4 className="filter__section--title">{t("catalog.filters.sale")}</h4>
        <input
          type="checkbox"
          checked={isSale}
          onChange={() => setIsSale(prev => !prev)}
        />
      </section>
      <section className="filter__check">
        <h4 className="filter__section--title">{t("catalog.filters.available")}</h4>
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={() => setIsAvailable(prev => !prev)}
        />
      </section>
    </aside>
  );
};