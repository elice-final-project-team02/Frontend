import React from 'react';
import styles from './Home.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Home() {
  return (
    <div className={cx('wrapper')}>
      <h1>메인페이지 </h1>
    </div>
  );
}
