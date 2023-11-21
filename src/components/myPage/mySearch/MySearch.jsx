import React from 'react';
import styles from './MySearch.module.scss';
import { IoIosSearch } from 'react-icons/io';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

MySearch.defaultProps = {
  value: '',
  onChange: () => {},
};

export default function MySearch({ value, onChange }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-container')}>
        <IoIosSearch className={cx('magnifier')} size="20" />
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="검색어를 입력하세요." />
      </div>
    </div>
  );
}
