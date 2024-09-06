import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setInputFilter } from '../../../../features/goodsSlice';

export const Search: React.FC = () => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(setInputFilter(search));
      console.log('Search initiated:', search);
    } else {
      dispatch(setInputFilter(''));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (location.pathname !== '/catalog') {
    return null;
  }

  return (
    <div className="header__search">
      <img
        src="img/icons/search.svg"
        alt="search"
        className="header__search--img"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};
