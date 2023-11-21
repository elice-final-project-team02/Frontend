import React from 'react';
import styles from './Button.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Button({ type, children }) {
  console.log(type);
  return (
    <span className={cx('wrapper')}>
      <button className={cx(type)}>{children}</button>
    </span>
  );
}
