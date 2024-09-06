import React from 'react'
import './filter.scss';
import classNames from 'classnames';
import { WAYS } from '../../../../../vars';

interface Props {
  wayToFilter: string;
  setWayToFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const TopFilter: React.FC<Props> = ({
  wayToFilter,
  setWayToFilter,
}) => {
  return (
    <div className="filter-top">
      {WAYS.map(way => (
          <div 
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
