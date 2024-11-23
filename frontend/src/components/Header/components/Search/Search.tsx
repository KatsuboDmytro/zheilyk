import React, { useRef, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setInputFilter } from '../../../../features/goodsSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SearchProps {
  isBurgerOpen: boolean;
  setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Search: React.FC<SearchProps> = ({ setIsBurgerOpen, isBurgerOpen }) => {
  const [t] = useTranslation("global");
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false); 
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      navigate('/catalog');
      setIsBurgerOpen(false);
      handleSearch();
    }
  };

  return (
    <div className="header__search">
      <img
        src="img/icons/search.svg"
        alt="search"
        style={{ left: !isFocused ? '-25px' : '16px' }}
        className="header__search--img"
        onClick={() => {
          inputRef.current?.focus();
          navigate('/catalog');
          setIsBurgerOpen(false);
          handleSearch();
        }}
      />
      <input
        ref={inputRef}
        style={{
          maxWidth: isBurgerOpen ? '200px' : '316px',
          padding: isFocused ? '9px 30px 9px 50px' : ' 9px 55px 9px 25px', 
        }}
        type="text"
        placeholder={t("header.search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
