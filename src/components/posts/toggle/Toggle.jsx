import React from 'react';
import styles from './Toggle.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Toggle({ onChange }) {
  function handleChange(e) {
    onChange(e);
  }
  return (
    <span className={cx('wrapper')}>
      <label className={cx('switch')}>
        <input type="checkbox" onChange={handleChange} />
        <span className={cx('slider')}>
          <span className={cx('left-letter')}>단기</span>
          <span className={cx('right-letter')}>정기</span>
        </span>
      </label>
    </span>
  );
}
