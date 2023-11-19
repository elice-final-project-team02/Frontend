import React from 'react';
import styles from './Login.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Login() {
  return (
    <div className={cx('wrapper')}>
      <h1>로그인</h1>
    </div>
  );
}
