import React, { useState } from 'react';
import styles from './MySearch.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function MySearch(props) {
  const [searchText, setSearchText] = useState('');

  const handleChangeSearchText = (e) => {
    const text = e.target.value;
    setSearchText(text);
    props.onSearchChange(text);
  };

  return (
    <span className={cx('wrapper')}>
      <input
        value={searchText}
        onChange={handleChangeSearchText}
        className={cx('search')}
        type="text"
        placeholder="검색어를 입력하세요."
      />
    </span>
  );
}
