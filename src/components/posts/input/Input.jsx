import React from 'react';
import styles from './Input.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Input() {
  return <span className={cx('wrapper')}></span>;
}
