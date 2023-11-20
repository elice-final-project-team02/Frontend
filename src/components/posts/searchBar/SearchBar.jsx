import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={cx('wrapper')}>
      <input
        type="text"
        className={cx('search-bar')}
        placeholder="검색어를 입력하세요"
        onChange={handleChange}
        value={searchInput}
      />
      <button className={cx('search-icon')}>
        <FaSearch color="#999999" />
      </button>
    </div>
  );
};

export default SearchBar;
