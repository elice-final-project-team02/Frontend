import React from 'react';
import styles from './Button.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Button({ theme, children }) {
  const styleMapper = {
    primary: 'primary',
    cancel: 'cancel',
  };
  return (
    <span className={cx('wrapper')}>
      <button className={cx(styleMapper[theme])}>{children}</button>
    </span>
  );
}
