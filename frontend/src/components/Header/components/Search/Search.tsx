import React from 'react'

export const Search: React.FC = () => {
  return (
    <div className="header__search">
      <img
        src="img/icons/search.svg"
        alt="search"
        className="header__search--img"
      />
      <input
        type="text"
        placeholder="Search"
      />
    </div>
  );
};
