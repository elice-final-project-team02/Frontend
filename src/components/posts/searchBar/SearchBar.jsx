import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

SearchBar.defaultProps = {
  value: '',
  onChange: () => {},
};

export default function SearchBar({ value, onChange }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-container')}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
