import React from 'react'
import './filter.scss';
import classNames from 'classnames';
import { WAYS } from '../../../../../vars';
import { useTranslation } from 'react-i18next';

interface Props {
  wayToFilter: string;
  setWayToFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const TopFilter: React.FC<Props> = ({
  wayToFilter,
  setWayToFilter,
}) => {
  const [t] = useTranslation("global");

  const ways = WAYS(t);

  return (
    <div className="filter-top">
      {ways.map(way => (
        <div
          key={way}
            className={classNames(
              "filter-top__block",
              {"filter-top__block--active": wayToFilter === way},
            )}
            onClick={() => setWayToFilter(way)}
          >
            {way}
          </div>
      ))}
    </div>
  );
};
