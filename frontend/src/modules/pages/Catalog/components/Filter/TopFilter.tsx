import React from 'react'
import './filter.scss';

export const TopFilter: React.FC = () => {
  return (
    <div className="filter-top">
      <div className="filter-top__block">Спочатку нові</div>
      <div className="filter-top__block">Спочатку дешевше</div>
      <div className="filter-top__block">Спочатку дорожче</div>
    </div>
  );
};
