import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

SearchBar.defaultProps = {
  searchInput: '',
  onSearchChange: () => {},
};

export default function SearchBar({ className, searchInput, onSearchChange }) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };
  return (
    <div className={cx(`wrapper-${className}`)}>
      <div className={cx('search-container')}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className={cx('search-bar')}
          placeholder="검색어를 입력하세요"
        />
        <button className={cx('search-icon')}>
          <FaSearch color="#999999" />
        </button>
      </div>
    </div>
  );
}
