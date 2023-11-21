import React, { useState } from 'react';
import styles from './MySearch.module.scss';
import { IoIosSearch } from 'react-icons/io';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function MySearch({ onSearchChange }) {
  const [searchText, setSearchText] = useState('');

  const handleChangeSearchText = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearchChange(text);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-container')}>
        <IoIosSearch className={cx('magnifier')} size="20" />
        <input value={searchText} onChange={handleChangeSearchText} type="text" placeholder="검색어를 입력하세요." />
      </div>
    </div>
  );
}
